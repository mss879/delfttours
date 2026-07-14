import { getArticles } from '@/app/actions/articles';
import ArticlesClient from '@/components/admin/ArticlesClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Manage Articles | Delft Admin',
};

export default async function ArticlesPage() {
  const articles = await getArticles(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Articles</h1>
        <p className="text-slate-500 mt-1">Write &amp; publish long-form travel articles shown on the website.</p>
      </div>

      <ArticlesClient initialArticles={articles || []} />
    </div>
  );
}
