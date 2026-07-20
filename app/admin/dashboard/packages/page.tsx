import { getPackagesAdmin } from '@/app/actions/packages';
import PackagesClient from '@/components/admin/PackagesClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Manage Packages | Delft Admin',
};

export default async function PackagesPage() {
  const packages = await getPackagesAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Packages</h1>
        <p className="text-slate-500 mt-1">Create, edit &amp; reorder the tour packages shown on the website.</p>
      </div>

      <PackagesClient initialPackages={packages || []} />
    </div>
  );
}
