'use server';

import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';
import { revalidatePath } from 'next/cache';
import { tourDetails, type TourDetail } from '@/app/tours/tour-data';

/**
 * Server actions for tour packages.
 *
 * Public reads use the cookie-free client so /tours pages stay statically
 * renderable / ISR-cacheable. If the `packages` table is missing (migration 012
 * not applied yet) or the DB is unreachable, public reads FALL BACK to the
 * original hard-coded `tourDetails` so the live site never breaks during the
 * cut-over. Once the table exists, the DB is the source of truth — including an
 * intentionally empty result when an admin unpublishes everything.
 */

// Shape a DB row into the TourDetail the front end already consumes. This is the
// seam that keeps the detail page / listing / checkout / sitemap untouched.
function rowToTourDetail(row: any): TourDetail {
  return {
    id: row.slug,
    title: row.title,
    description: row.description ?? '',
    images: Array.isArray(row.images) ? row.images : [],
    heroImages: Array.isArray(row.hero_images) ? row.hero_images : [],
    days: Array.isArray(row.days)
      ? row.days.map((d: any) => ({
          title: d?.title ?? '',
          description: d?.description ?? '',
          highlights: Array.isArray(d?.highlights) ? d.highlights : [],
        }))
      : [],
    inclusions: Array.isArray(row.inclusions) ? row.inclusions : [],
    mapImage: row.map_image ?? undefined,
    countries: Array.isArray(row.countries) ? row.countries : undefined,
    destinations: Array.isArray(row.destinations) ? row.destinations : undefined,
    themes: Array.isArray(row.themes) ? row.themes : undefined,
    religions: Array.isArray(row.religions) ? row.religions : undefined,
    activities: Array.isArray(row.activities) ? row.activities : undefined,
    suitable_for: Array.isArray(row.suitable_for) ? row.suitable_for : undefined,
    startingPrice: row.starting_price ?? undefined,
  };
}

/** Published packages for the public site (listing, sitemap, generateStaticParams). */
export async function getPublishedPackages(): Promise<TourDetail[]> {
  const supabase = createPublicClient();
  if (!supabase) return tourDetails;

  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.warn('[packages] DB read failed — using static fallback:', error.message);
    return tourDetails;
  }

  return (data ?? []).map(rowToTourDetail);
}

const LEGACY_CODE_TO_SLUG: Record<string, string> = {
  'SL-3D2N-CTY-01': '3-day-quick-tour-of-2-cities',
  'SL-4D3N-STD-01': 'essence-of-sri-lanka-4-days',
  'SL-5D4N-STD-01': 'essence-of-sri-lanka-5-days',
  'SL-5D4N-STD-02': 'island-escape-5-days',
  'SL-5D4N-WLD-03': 'temples-wildlife-and-beach-5-days',
  'SL-5D4N-BCH-04': 'taste-of-paradise-5-days',
  'SL-5D4N-STD-05': '5-days-island-escape-high-tea-variation',
  'SL-5D4N-HNM-06': 'romantic-days-in-paradise-5-days',
  'SL-6D5N-STD-01': 'island-charm-express-6-days',
  'SL-6D5N-STD-02': 'tropical-trails-6-days',
  'SL-6D5N-WLD-03': 'temples-wildlife-and-beach-6-days',
  'SL-7D6N-HNM-01': 'love-and-adventure-7-days',
  'SL-7D6N-NGBE-02': 'whispers-of-lanka-7-days',
  'SL-7D6N-STD-02': 'rhythms-of-ceylon-8-days',
  'SL-9D8N-STD-01': 'pearl-island-getaway-9-days',
  'SL-10D9N-STD-01': 'sri-lanka-dream-route-10-days',
  'SL-10D9N-STD-02': 'amazing-sri-lanka-tour-10-days',
  'SL-11D10N-STD-01': 'full-spectrum-journey-11-days',
  'SL-12D11N-STD-01': 'ceylon-panorama-journey-12-days',
  'SL-12D11N-HNM-02': 'dreamy-honeymoon-days-12-days',
  'SL-14D13N-CLT-01': 'journey-culture-and-nature-14-days',
  'SL-13D12N-STD-01': 'sri-lanka-grand-discovery-tour-13-days',
  'SL-15D14N-HNM-01': 'romantic-bliss-15-days',
};

/** A single published package by its slug or legacy code (detail + checkout pages). */
export async function getPackageBySlug(slugInput: string): Promise<TourDetail | null> {
  const targetSlug = LEGACY_CODE_TO_SLUG[slugInput] || slugInput;
  const supabase = createPublicClient();
  if (!supabase) return tourDetails.find((t) => t.id === targetSlug || t.id === slugInput) ?? null;

  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', targetSlug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    console.warn('[packages] DB read failed — using static fallback:', error.message);
    return tourDetails.find((t) => t.id === targetSlug || t.id === slugInput) ?? null;
  }

  return data ? rowToTourDetail(data) : null;
}

/** All packages (incl. hidden), raw rows, for the admin dashboard. */
export async function getPackagesAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching packages (admin):', error.message);
    return [];
  }

  return data ?? [];
}

function parsePackage(formData: FormData) {
  const jsonField = (key: string) => {
    try {
      const raw = (formData.get(key) as string) || '[]';
      const val = JSON.parse(raw);
      return Array.isArray(val) ? val : [];
    } catch {
      return [];
    }
  };
  const str = (key: string) => ((formData.get(key) as string) ?? '').trim();
  const sortRaw = parseInt((formData.get('sort_order') as string) || '0', 10);

  return {
    slug: str('slug'),
    title: str('title'),
    starting_price: str('starting_price') || null,
    description: (formData.get('description') as string) ?? '',
    days: jsonField('days'),
    inclusions: jsonField('inclusions'),
    images: jsonField('images'),
    hero_images: jsonField('hero_images'),
    map_image: str('map_image') || null,
    countries: jsonField('countries'),
    destinations: jsonField('destinations'),
    themes: jsonField('themes'),
    religions: jsonField('religions'),
    activities: jsonField('activities'),
    suitable_for: jsonField('suitable_for'),
    sort_order: Number.isFinite(sortRaw) ? sortRaw : 0,
    is_published: formData.get('is_published') === 'true',
  };
}

// The DB enforces slug uniqueness; surface that as something an editor can act on.
function friendlyError(error: { code?: string; message: string }) {
  if (error.code === '23505') return 'That URL code / slug is already in use. Please choose a different one.';
  return error.message;
}

function revalidatePackages() {
  revalidatePath('/admin/dashboard/packages');
  revalidatePath('/tours');
  revalidatePath('/tours/[id]', 'page');
  revalidatePath('/tours/[id]/checkout', 'page');
  revalidatePath('/sitemap.xml');
}

export async function createPackage(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from('packages').insert([parsePackage(formData)]);

  if (error) {
    return { success: false, error: friendlyError(error) };
  }

  revalidatePackages();
  return { success: true };
}

export async function updatePackage(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('packages')
    .update({ ...parsePackage(formData), updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: friendlyError(error) };
  }

  revalidatePackages();
  return { success: true };
}

export async function deletePackage(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('packages').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePackages();
  return { success: true };
}

export async function togglePackagePublished(id: string, is_published: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('packages')
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePackages();
  return { success: true };
}
