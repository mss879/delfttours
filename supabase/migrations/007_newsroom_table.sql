-- Migration: Newsroom table (in-house news & announcements)
-- Run this in the Supabase SQL Editor.

-- 1. Create newsroom table
CREATE TABLE IF NOT EXISTS newsroom (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,                        -- short summary shown on the card
  content TEXT NOT NULL,               -- full article body shown in the popup
  image_url TEXT,                      -- public URL from the "media" storage bucket
  published_date DATE DEFAULT CURRENT_DATE,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_newsroom_published ON newsroom(is_published);
CREATE INDEX IF NOT EXISTS idx_newsroom_published_date ON newsroom(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_newsroom_created_at ON newsroom(created_at DESC);

-- 3. Enable RLS
ALTER TABLE newsroom ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
DROP POLICY IF EXISTS "Public can view published news" ON newsroom;
CREATE POLICY "Public can view published news"
  ON newsroom FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated users can manage news" ON newsroom;
CREATE POLICY "Authenticated users can manage news"
  ON newsroom FOR ALL
  USING (auth.role() = 'authenticated');
