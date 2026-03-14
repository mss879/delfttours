-- Migration: CRM Tables for Kanban Pipeline System
-- Run this in Supabase SQL Editor or as a migration

-- ============================================================
-- 1. Pipelines (e.g. "Sales Pipeline", "Follow-up Pipeline")
-- ============================================================
CREATE TABLE IF NOT EXISTS pipelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. Pipeline Stages (columns in the Kanban board)
-- ============================================================
CREATE TABLE IF NOT EXISTS pipeline_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id UUID NOT NULL REFERENCES pipelines(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3b82f6',
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. Leads (cards on the Kanban board)
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id UUID NOT NULL REFERENCES pipelines(id) ON DELETE CASCADE,
  stage_id UUID REFERENCES pipeline_stages(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source TEXT DEFAULT 'manual',
  inquiry_id BIGINT REFERENCES inquiries(id) ON DELETE SET NULL,
  notes TEXT,
  value NUMERIC(10,2),
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. Add converted flag to existing inquiries table
-- ============================================================
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS converted_to_lead BOOLEAN DEFAULT FALSE;

-- ============================================================
-- 5. Indexes for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_pipeline_stages_pipeline ON pipeline_stages(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_pipeline_stages_position ON pipeline_stages(pipeline_id, position);
CREATE INDEX IF NOT EXISTS idx_leads_pipeline ON leads(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage_id);
CREATE INDEX IF NOT EXISTS idx_leads_position ON leads(stage_id, position);
CREATE INDEX IF NOT EXISTS idx_leads_inquiry ON leads(inquiry_id);

-- ============================================================
-- 6. Enable Row Level Security
-- ============================================================
ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 7. RLS Policies (authenticated users only)
-- ============================================================
CREATE POLICY "Authenticated users can manage pipelines"
  ON pipelines FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage stages"
  ON pipeline_stages FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage leads"
  ON leads FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================
-- 8. Seed a default pipeline with stages
-- ============================================================
DO $$
DECLARE
  default_pipeline_id UUID;
BEGIN
  -- Only seed if no pipelines exist
  IF NOT EXISTS (SELECT 1 FROM pipelines LIMIT 1) THEN
    INSERT INTO pipelines (name) VALUES ('Sales Pipeline')
    RETURNING id INTO default_pipeline_id;

    INSERT INTO pipeline_stages (pipeline_id, name, color, position) VALUES
      (default_pipeline_id, 'New Lead',   '#6366f1', 0),
      (default_pipeline_id, 'Contacted',  '#3b82f6', 1),
      (default_pipeline_id, 'Qualified',  '#f59e0b', 2),
      (default_pipeline_id, 'Proposal',   '#8b5cf6', 3),
      (default_pipeline_id, 'Won',        '#22c55e', 4),
      (default_pipeline_id, 'Lost',       '#ef4444', 5);
  END IF;
END $$;
