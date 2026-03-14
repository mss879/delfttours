'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// ============================================================
// HELPERS
// ============================================================

function generateBookingRef(): string {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `DT-${dateStr}-${rand}`
}

// ============================================================
// CREATE BOOKING (called from checkout form — no auth required)
// ============================================================

export interface CreateBookingInput {
  tour_id: string
  tour_title: string
  tour_price?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  country?: string
  travelers: number
  travel_date?: string
  special_requests?: string
  payment_method: 'bank_transfer' | 'pay_by_link'
}

export async function createBooking(input: CreateBookingInput) {
  const supabase = await createClient()

  const bookingRef = generateBookingRef()

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      booking_ref: bookingRef,
      tour_id: input.tour_id,
      tour_title: input.tour_title,
      tour_price: input.tour_price || null,
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      phone: input.phone || null,
      country: input.country || null,
      travelers: input.travelers,
      travel_date: input.travel_date || null,
      special_requests: input.special_requests || null,
      payment_method: input.payment_method,
      payment_status: 'pending',
      booking_status: 'new',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// ============================================================
// READ BOOKINGS (admin only)
// ============================================================

export async function getBookings() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch bookings:', error.message)
    return []
  }
  return data
}

// ============================================================
// UPDATE BOOKING STATUS
// ============================================================

export async function updateBookingStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('bookings')
    .update({ booking_status: status, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
  revalidatePath('/admin/dashboard/bookings')
}

// ============================================================
// UPDATE PAYMENT STATUS
// ============================================================

export async function updatePaymentStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('bookings')
    .update({ payment_status: status, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
  revalidatePath('/admin/dashboard/bookings')
}

// ============================================================
// DELETE BOOKING
// ============================================================

export async function deleteBooking(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('bookings').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/dashboard/bookings')
}
