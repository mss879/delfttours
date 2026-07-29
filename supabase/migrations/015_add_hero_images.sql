-- Migration: Add hero_images column to packages table for package hero carousel.
-- Up to 4 custom images for the package page hero carousel.

ALTER TABLE packages
ADD COLUMN IF NOT EXISTS hero_images TEXT[] NOT NULL DEFAULT '{}';
