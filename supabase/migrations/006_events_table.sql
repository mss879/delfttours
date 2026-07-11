-- Migration: Events table
-- Run this in the Supabase SQL Editor.

-- 1. Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMPTZ,          -- date & time of the event
  location TEXT,                   -- optional venue / city (safe to leave blank)
  image_url TEXT,                  -- public URL from the "media" storage bucket
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);

-- 3. Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
DROP POLICY IF EXISTS "Public can view published events" ON events;
CREATE POLICY "Public can view published events"
  ON events FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated users can manage events" ON events;
CREATE POLICY "Authenticated users can manage events"
  ON events FOR ALL
  USING (auth.role() = 'authenticated');
