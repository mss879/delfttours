-- Migration: Create FAQs table & seed existing FAQ items
-- Run this in the Supabase SQL Editor.

-- 1. Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Indexes for efficient lookup
CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(is_published);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs(display_order ASC);

-- 3. Enable Row Level Security
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
DROP POLICY IF EXISTS "Public can view published faqs" ON faqs;
CREATE POLICY "Public can view published faqs"
  ON faqs FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated users can manage faqs" ON faqs;
CREATE POLICY "Authenticated users can manage faqs"
  ON faqs FOR ALL
  USING (auth.role() = 'authenticated');

-- 5. Seed existing FAQs
INSERT INTO faqs (category, question, answer, display_order, is_published) VALUES
-- General Information
('General Information', 'Where is Delft Tours located?', 'Delft Tours is located in Sri Lanka, at No 29/5 Jayasinghe Road, Kirullapone, Colombo 06.', 1, true),
('General Information', 'What destinations does Delft Tours cover?', 'We specialise in inbound tours across Sri Lanka — including the Cultural Triangle, hill country, wildlife national parks, and the southern coast. Every itinerary is designed and operated by our local team on the ground.', 2, true),
('General Information', 'Where can I read previous reviews & customer success stories?', 'You can read reviews and success stories on our "Success Stories" page or check our reviews on independent travel forums and social media platforms.', 3, true),

-- Booking & Payments
('Booking & Payments', 'How do I book a tour with Delft Tours?', 'You can request a quote through our website, call us directly, or send an email. Our team will contact you to confirm dates, itinerary, and payment details.', 4, true),
('Booking & Payments', 'When will the reservation be confirmed?', 'Your reservation will be confirmed once the initial deposit is made. You will receive a booking confirmation email with all the details.', 5, true),
('Booking & Payments', 'Can I read the terms and conditions before making a reservation?', 'Yes, our terms and conditions are available on our website. We encourage you to read them carefully before confirming your booking.', 6, true),
('Booking & Payments', 'How will I receive confirmation of my booking?', 'Confirmation will be sent to your registered email address along with the official invoice and itinerary details.', 7, true),

-- Travel & Logistics
('Travel & Logistics', 'Do I need travel insurance?', 'Yes, we highly recommend obtaining comprehensive travel insurance that covers trip cancellations, medical emergencies, and lost luggage for your peace of mind.', 8, true),
('Travel & Logistics', 'What type of clothes should I pack?', 'Sri Lanka is tropical year-round, so light cotton clothing is recommended. Pack a light layer for the cooler hill country, and modest attire (covered shoulders and knees) for visits to temples and other religious sites.', 9, true),
('Travel & Logistics', 'Should I pay for taking photographs of people or places?', 'In some cultural sites or when interacting with locals, a small tip or permission may be required. Your guide will advise you on the specific etiquette.', 10, true),

-- Support & Services
('Support & Services', 'What services can I book with Delft Tours?', 'We offer a full range of Sri Lanka inbound services, including tailor-made tours, group packages, hotel bookings, private transport with a chauffeur-guide, airport transfers, and specialised getaway holidays.', 11, true),
('Support & Services', 'Can I make a complaint if something goes wrong?', 'Absolutely. We take customer satisfaction seriously. If you encounter any issues, please contact our support team immediately.', 12, true),
('Support & Services', 'How can I contact Delft Tours if I have questions?', 'You can contact us 24/7 via phone or WhatsApp at +94 76 922 0306 or email us at support@delfttours.com.', 13, true);
