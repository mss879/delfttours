import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Cookie-free anon client for reading PUBLIC data from server components.
 *
 * `lib/supabase/server.ts` reads cookies() to carry the auth session, which
 * opts the calling route out of static rendering. Public reads (published
 * articles) need no session, so they use this client instead and the page stays
 * statically renderable / ISR-cacheable. Only use this for data that RLS
 * exposes to anon — it carries no user session.
 */
export function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
