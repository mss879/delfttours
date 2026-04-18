'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getTestimonials(publishedOnly = false) {
  const supabase = await createClient();
  
  let query = supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (publishedOnly) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data;
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();
  
  const rawData = {
    author_name: formData.get('author_name') as string,
    author_location: formData.get('author_location') as string,
    tour_type: formData.get('tour_type') as string,
    content: formData.get('content') as string,
    rating: parseInt(formData.get('rating') as string, 10),
    is_published: formData.get('is_published') === 'true',
  };

  const { error } = await supabase
    .from('testimonials')
    .insert([rawData]);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/testimonials');
  revalidatePath('/success-stories');
  return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient();
  
  const rawData = {
    author_name: formData.get('author_name') as string,
    author_location: formData.get('author_location') as string,
    tour_type: formData.get('tour_type') as string,
    content: formData.get('content') as string,
    rating: parseInt(formData.get('rating') as string, 10),
    is_published: formData.get('is_published') === 'true',
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('testimonials')
    .update(rawData)
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/testimonials');
  revalidatePath('/success-stories');
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/testimonials');
  revalidatePath('/success-stories');
  return { success: true };
}

export async function toggleTestimonialPublished(id: string, is_published: boolean) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('testimonials')
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/testimonials');
  revalidatePath('/success-stories');
  return { success: true };
}
