'use server';

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import { revalidatePath } from 'next/cache';
import type { Article } from '@/components/ArticleCard';

/**
 * Published articles for public listings (homepage preview, articles index).
 *
 * Uses the cookie-free client so callers stay statically renderable, and selects
 * only the card columns — getArticles() does select('*'), which pulls every
 * article's full HTML `content` body just to render a headline and excerpt.
 */
export async function getPublishedArticles(limit?: number): Promise<Article[]> {
  const supabase = createPublicClient();
  if (!supabase) return [];

  let query = supabase
    .from('articles')
    .select('id, slug, title, excerpt, image_url, author, published_date')
    .eq('is_published', true)
    .order('published_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching published articles:', error);
    return [];
  }

  return (data as Article[]) ?? [];
}

export async function getArticles(publishedOnly = false) {
  const supabase = await createClient();

  let query = supabase
    .from('articles')
    .select('*')
    .order('published_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (publishedOnly) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data;
}

export async function getArticleBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  return data;
}

function parseArticle(formData: FormData) {
  const publishedDate = formData.get('published_date') as string;
  const imageUrl = formData.get('image_url') as string;
  const author = formData.get('author') as string;
  return {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: (formData.get('excerpt') as string) || null,
    content: formData.get('content') as string,
    image_url: imageUrl || null,
    author: author || 'Delft Tours Editorial',
    published_date: publishedDate || null,
    is_published: formData.get('is_published') === 'true',
  };
}

// The DB enforces slug uniqueness; surface that as something an editor can act on
// rather than the raw Postgres driver string.
function friendlyError(error: { code?: string; message: string }) {
  if (error.code === '23505') return 'That slug is already in use. Please choose a different one.';
  return error.message;
}

function revalidateArticles() {
  revalidatePath('/admin/dashboard/articles');
  revalidatePath('/articles');
  // The homepage carries an ArticlesPreview of the 3 latest published articles.
  revalidatePath('/');
  revalidatePath('/articles/[slug]', 'page');
  revalidatePath('/sitemap.xml');
}

export async function createArticle(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from('articles').insert([parseArticle(formData)]);

  if (error) {
    return { success: false, error: friendlyError(error) };
  }

  revalidateArticles();
  return { success: true };
}

export async function updateArticle(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('articles')
    .update({ ...parseArticle(formData), updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: friendlyError(error) };
  }

  revalidateArticles();
  return { success: true };
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('articles').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateArticles();
  return { success: true };
}

export async function toggleArticlePublished(id: string, is_published: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('articles')
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateArticles();
  return { success: true };
}
