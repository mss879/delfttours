import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getFaqs } from '@/app/actions/faqs';
import FaqsManager from '@/components/admin/FaqsManager';

export const dynamic = 'force-dynamic';

export default async function AdminFaqsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const faqs = await getFaqs(false);

  return <FaqsManager initialFaqs={faqs} />;
}
