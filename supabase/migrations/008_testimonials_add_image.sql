-- Migration: add an author image to testimonials
-- Run this in the Supabase SQL Editor.

ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS image_url TEXT;  -- public URL from the "media" storage bucket
