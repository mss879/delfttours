-- Migration: Bookings table for tour checkout submissions
-- Run this in Supabase SQL Editor or as a migration

-- ============================================================
-- 1. Bookings table
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref TEXT NOT NULL UNIQUE,
  tour_id TEXT NOT NULL,
  tour_title TEXT NOT NULL,
  tour_price TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  travelers INT NOT NULL DEFAULT 1,
  travel_date DATE,
  special_requests TEXT,
  payment_method TEXT NOT NULL DEFAULT 'bank_transfer'
    CHECK (payment_method IN ('bank_transfer', 'pay_by_link')),
  payment_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  booking_status TEXT NOT NULL DEFAULT 'new'
    CHECK (booking_status IN ('new', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_ref);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_tour ON bookings(tour_id);

-- ============================================================
-- 3. Enable Row Level Security
-- ============================================================
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. RLS Policies
-- ============================================================

-- Anyone (anon / public checkout form) can insert a booking
CREATE POLICY "Enable insert for everyone" ON bookings
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admin) can view bookings
CREATE POLICY "Enable read for authenticated users" ON bookings
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated users (admin) can update bookings
CREATE POLICY "Enable update for authenticated users" ON bookings
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Only authenticated users (admin) can delete bookings
CREATE POLICY "Enable delete for authenticated users" ON bookings
  FOR DELETE
  USING (auth.role() = 'authenticated');
