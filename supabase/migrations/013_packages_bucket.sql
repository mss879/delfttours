-- Migration: dedicated "packages" storage bucket for tour-package images.
-- Run this in the Supabase SQL Editor.
--
-- One public bucket holds every admin-uploaded package image: hero/gallery
-- photos (folder "hero/"), per-day itinerary photos ("days/") and journey maps
-- ("maps/"). You can alternatively create it from the Supabase Dashboard
-- (Storage -> New bucket -> name "packages", Public = ON); this SQL does the
-- same thing and adds the access policies.

-- 1. Create a public bucket named "packages"
--    5 MB size cap + image-only MIME types enforced server-side by Supabase.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'packages', 'packages', true, 5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Policies on storage.objects scoped to this bucket

-- Anyone can view package images (needed to render them on the public website).
DROP POLICY IF EXISTS "Public read packages" ON storage.objects;
CREATE POLICY "Public read packages"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'packages');

-- Only authenticated admins can upload.
DROP POLICY IF EXISTS "Authenticated upload packages" ON storage.objects;
CREATE POLICY "Authenticated upload packages"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'packages');

-- Only authenticated admins can overwrite existing files.
DROP POLICY IF EXISTS "Authenticated update packages" ON storage.objects;
CREATE POLICY "Authenticated update packages"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'packages')
  WITH CHECK (bucket_id = 'packages');

-- Only authenticated admins can delete files.
DROP POLICY IF EXISTS "Authenticated delete packages" ON storage.objects;
CREATE POLICY "Authenticated delete packages"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'packages');
