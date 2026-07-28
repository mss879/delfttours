-- Migration: Add suitable_for column to packages table
ALTER TABLE packages ADD COLUMN IF NOT EXISTS suitable_for TEXT[] NOT NULL DEFAULT '{}';
