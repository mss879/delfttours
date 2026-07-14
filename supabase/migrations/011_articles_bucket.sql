-- Migration: dedicated "articles" storage bucket for article cover images.
-- Run this in the Supabase SQL Editor.
--
-- You can alternatively create the bucket from the Supabase Dashboard
-- (Storage → New bucket → name "articles", Public = ON). This SQL does the
-- same thing and adds the access policies.

-- 1. Create a public bucket named "articles"
--    5 MB size cap + image-only MIME types enforced server-side by Supabase.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'articles', 'articles', true, 5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Policies on storage.objects scoped to this bucket

-- Anyone can view article images (needed to render them on the public website).
DROP POLICY IF EXISTS "Public read articles" ON storage.objects;
CREATE POLICY "Public read articles"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'articles');

-- Only authenticated admins can upload.
DROP POLICY IF EXISTS "Authenticated upload articles" ON storage.objects;
CREATE POLICY "Authenticated upload articles"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'articles');

-- Only authenticated admins can overwrite existing files.
DROP POLICY IF EXISTS "Authenticated update articles" ON storage.objects;
CREATE POLICY "Authenticated update articles"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'articles')
  WITH CHECK (bucket_id = 'articles');

-- Only authenticated admins can delete files.
DROP POLICY IF EXISTS "Authenticated delete articles" ON storage.objects;
CREATE POLICY "Authenticated delete articles"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'articles');
