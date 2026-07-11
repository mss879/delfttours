'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getEvents(publishedOnly = false) {
  const supabase = await createClient();

  let query = supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (publishedOnly) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data;
}

function parseEvent(formData: FormData) {
  const eventDate = formData.get('event_date') as string;
  const imageUrl = formData.get('image_url') as string;
  return {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    event_date: eventDate ? new Date(eventDate).toISOString() : null,
    image_url: imageUrl || null,
    is_published: formData.get('is_published') === 'true',
  };
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from('events').insert([parseEvent(formData)]);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/events');
  revalidatePath('/events');
  return { success: true };
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('events')
    .update({ ...parseEvent(formData), updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/events');
  revalidatePath('/events');
  return { success: true };
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('events').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/events');
  revalidatePath('/events');
  return { success: true };
}

export async function toggleEventPublished(id: string, is_published: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('events')
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/events');
  revalidatePath('/events');
  return { success: true };
}
