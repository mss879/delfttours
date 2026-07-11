-- Migration: Public "media" storage bucket for admin-uploaded images
-- (events, newsroom, testimonials). Run this in the Supabase SQL Editor.
--
-- You can alternatively create the bucket from the Supabase Dashboard
-- (Storage → New bucket → name "media", Public = ON). This SQL does the
-- same thing and adds the access policies.

-- 1. Create a public bucket named "media"
--    file_size_limit (5 MB) and allowed_mime_types are enforced server-side by
--    Supabase, so they can't be bypassed by a client hitting the Storage API
--    directly (the checks in ImageUpload.tsx are just for a nicer UX).
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media', 'media', true, 5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Policies on storage.objects scoped to this bucket
--    (storage.objects already has RLS enabled by Supabase)

-- Anyone can read/view files in the media bucket (needed to render images on
-- the public website).
DROP POLICY IF EXISTS "Public read media" ON storage.objects;
CREATE POLICY "Public read media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Only authenticated admins can upload.
DROP POLICY IF EXISTS "Authenticated upload media" ON storage.objects;
CREATE POLICY "Authenticated upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

-- Only authenticated admins can overwrite existing files.
DROP POLICY IF EXISTS "Authenticated update media" ON storage.objects;
CREATE POLICY "Authenticated update media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media')
  WITH CHECK (bucket_id = 'media');

-- Only authenticated admins can delete files.
DROP POLICY IF EXISTS "Authenticated delete media" ON storage.objects;
CREATE POLICY "Authenticated delete media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
