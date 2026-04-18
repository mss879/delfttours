-- Migration: Testimonials Table
-- Run this in Supabase SQL Editor

-- 1. Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_location TEXT, -- e.g., "London, UK"
  tour_type TEXT,       -- e.g., "12-Day Wildlife Safari"
  content TEXT NOT NULL,
  rating SMALLINT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);

-- 3. Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Anyone can read published testimonials
CREATE POLICY "Public can view published testimonials"
  ON testimonials FOR SELECT
  USING (is_published = true);

-- Only authenticated admins can manage (insert/update/delete/view unpublished)
CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

-- 5. Insert 6 Realistic Fake Testimonials
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM testimonials LIMIT 1) THEN
    INSERT INTO testimonials (author_name, author_location, tour_type, content, rating, is_published) VALUES
    (
      'Sarah & James Halpert', 
      'London, United Kingdom', 
      '14-Day Honeymoon Escape', 
      'Our honeymoon in Sri Lanka was absolutely magical thanks to Delft Tours. From the breathtaking misty tea plantations in Nuwara Eliya to our private dinner on the beach in Mirissa, everything was flawlessly organized. Our driver, Kamal, was incredibly knowledgeable, safe, and quickly felt like a friend. We could not have asked for a better start to our marriage!', 
      5, 
      true
    ),
    (
      'Markus Schmidt', 
      'Munich, Germany', 
      'Wildlife Photography Safari', 
      'I came to Sri Lanka specifically for the wildlife, and Delft Tours delivered far beyond my expectations. We managed to spot three different leopards in Yala National Park, and witnessing the incredible elephant gathering at Minneriya was a life-changing experience. The accommodations were top-notch and strategically located to give us early access to the parks. Highly recommended for nature lovers!', 
      5, 
      true
    ),
    (
      'The Patel Family', 
      'Toronto, Canada', 
      'Cultural Triangle Highlights', 
      'Traveling with two restless teenagers is never easy, but this tour kept everyone engaged! Exploring the ancient ruins of Polonnaruwa on bicycles and climbing Sigiriya Rock were huge highlights. The guides managed to bring the rich 2,500-year-old history of the island to life with fascinating stories rather than dry facts. A perfect family vacation.', 
      5, 
      true
    ),
    (
      'Emma Clarkson', 
      'Sydney, Australia', 
      '7-Day Surf & Sun Retreat', 
      'A totally stress-free beach holiday. The Delft Tours team picked me up straight from the airport and had me relaxing in my beachside cabana in Weligama within a few hours. When the surfing conditions shifted, they were super flexible and immediately arranged an incredible snorkeling trip instead. Top tier service in a beautiful country.', 
      4, 
      true
    ),
    (
      'Dr. Robert Chen', 
      'Singapore', 
      'Grand Sri Lanka Tour', 
      'The attention to detail provided by Delft Tours is what sets them apart. As a busy professional, I had zero time to plan this vacation. They curated a deeply personalized 12-day itinerary that balanced cultural sights, high-end culinary experiences, and pure relaxation. The boutique hotels they chose were absolutely phenomenal.', 
      5, 
      true
    ),
    (
      'Sofia Rossi', 
      'Milan, Italy', 
      'Custom Heritage Tour', 
      'Simply spectacular. I was completely mesmerized by the intricate details of the Dambulla Cave Temples and the spiritual energy at the Temple of the Tooth in Kandy. The agency was incredibly responsive during the booking process, and everything on the ground executed perfectly. Sri Lanka is a beautiful gem, and Delft Tours polished it for us.', 
      5, 
      true
    );
  END IF;
END $$;
