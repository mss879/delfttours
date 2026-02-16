'use server'

import { createClient } from '@/lib/supabase/server'

export interface InquiryState {
  message: string
  error?: boolean
  success?: boolean
}

export async function submitInquiry(prevState: any, formData: FormData): Promise<InquiryState> {
  const supabase = await createClient()
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const message = formData.get('message') as string

  // Basic validation
  if (!firstName || !lastName || !email || !message) {
    return {
      error: true,
      message: 'Please fill in all required fields.'
    }
  }

  try {
    const { error } = await supabase
      .from('inquiries')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          message,
          status: 'pending' // Default status
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return {
        error: true,
        message: 'Failed to submit inquiry. Please try again.'
      }
    }

    return {
      success: true,
      message: 'Thank you for your inquiry! We will get back to you soon.'
    }
  } catch (err) {
    console.error('Server error:', err)
    return {
      error: true,
      message: 'Something went wrong.'
    }
  }
}
