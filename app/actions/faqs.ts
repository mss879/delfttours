'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getFaqs(publishedOnly = false): Promise<FAQItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (publishedOnly) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return data as FAQItem[];
}

function parseFaq(formData: FormData) {
  const displayOrderRaw = formData.get('display_order');
  return {
    category: (formData.get('category') as string)?.trim() || 'General Information',
    question: (formData.get('question') as string)?.trim() || '',
    answer: (formData.get('answer') as string)?.trim() || '',
    display_order: displayOrderRaw ? parseInt(displayOrderRaw as string, 10) : 0,
    is_published: formData.get('is_published') === 'true' || formData.get('is_published') === 'on',
  };
}

export async function createFaq(formData: FormData) {
  const supabase = await createClient();

  const faqData = parseFaq(formData);
  if (!faqData.question || !faqData.answer) {
    return { success: false, error: 'Question and Answer are required.' };
  }

  const { error } = await supabase.from('faqs').insert([faqData]);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/faqs');
  revalidatePath('/faq');
  return { success: true };
}

export async function updateFaq(id: string, formData: FormData) {
  const supabase = await createClient();

  const faqData = parseFaq(formData);
  if (!faqData.question || !faqData.answer) {
    return { success: false, error: 'Question and Answer are required.' };
  }

  const { error } = await supabase
    .from('faqs')
    .update({ ...faqData, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/faqs');
  revalidatePath('/faq');
  return { success: true };
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('faqs').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/faqs');
  revalidatePath('/faq');
  return { success: true };
}

export async function toggleFaqPublished(id: string, is_published: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('faqs')
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/dashboard/faqs');
  revalidatePath('/faq');
  return { success: true };
}
