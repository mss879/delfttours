'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getNews(publishedOnly = false) {
  const supabase = await createClient();

  let query = supabase
    .from('newsroom')
    .select('*')
    .order('published_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (publishedOnly) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }

  return data;
}

function parseNews(formData: FormData) {
  const publishedDate = formData.get('published_date') as string;
  const imageUrl = formData.get('image_url') as string;
  return {
    title: formData.get('title') as string,
    excerpt: (formData.get('excerpt') as string) || null,
    content: formData.get('content') as string,
    image_url: imageUrl || null,
    published_date: publishedDate || null,
    is_published: formData.get('is_published') === 'true',
  };
}

export async function createNews(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from('newsroom').insert([parseNews(formData)]);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/newsroom');
  revalidatePath('/newsroom');
  return { success: true };
}

export async function updateNews(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('newsroom')
    .update({ ...parseNews(formData), updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/newsroom');
  revalidatePath('/newsroom');
  return { success: true };
}

export async function deleteNews(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('newsroom').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/newsroom');
  revalidatePath('/newsroom');
  return { success: true };
}

export async function toggleNewsPublished(id: string, is_published: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('newsroom')
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/newsroom');
  revalidatePath('/newsroom');
  return { success: true };
}
