-- Migration: dedicated "testimonials" storage bucket for author photos.
-- Run this in the Supabase SQL Editor.
--
-- You can alternatively create the bucket from the Supabase Dashboard
-- (Storage → New bucket → name "testimonials", Public = ON). This SQL does the
-- same thing and adds the access policies.

-- 1. Create a public bucket named "testimonials"
--    5 MB size cap + image-only MIME types enforced server-side by Supabase.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonials', 'testimonials', true, 5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Policies on storage.objects scoped to this bucket

-- Anyone can view author photos (needed to render them on the public website).
DROP POLICY IF EXISTS "Public read testimonials" ON storage.objects;
CREATE POLICY "Public read testimonials"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'testimonials');

-- Only authenticated admins can upload.
DROP POLICY IF EXISTS "Authenticated upload testimonials" ON storage.objects;
CREATE POLICY "Authenticated upload testimonials"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'testimonials');

-- Only authenticated admins can overwrite existing files.
DROP POLICY IF EXISTS "Authenticated update testimonials" ON storage.objects;
CREATE POLICY "Authenticated update testimonials"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'testimonials')
  WITH CHECK (bucket_id = 'testimonials');

-- Only authenticated admins can delete files.
DROP POLICY IF EXISTS "Authenticated delete testimonials" ON storage.objects;
CREATE POLICY "Authenticated delete testimonials"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'testimonials');
