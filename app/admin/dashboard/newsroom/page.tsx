import { getNews } from '@/app/actions/newsroom';
import NewsroomClient from '@/components/admin/NewsroomClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Manage Newsroom | Delft Admin',
};

export default async function NewsroomPage() {
  const news = await getNews(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Newsroom</h1>
        <p className="text-slate-500 mt-1">Publish news &amp; announcements shown on the website.</p>
      </div>

      <NewsroomClient initialNews={news || []} />
    </div>
  );
}
