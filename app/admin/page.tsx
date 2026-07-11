import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// Visiting /admin directly should never 404. Send signed-in admins to the
// dashboard and everyone else to the login page.
export default async function AdminIndexPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  redirect(user ? '/admin/dashboard' : '/admin/login');
}
