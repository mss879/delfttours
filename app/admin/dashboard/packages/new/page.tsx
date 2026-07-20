import { getPackagesAdmin } from '@/app/actions/packages';
import { knownTagValues } from '@/app/tours/facets';
import PackageEditor from '@/components/admin/PackageEditor';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'New Package | Delft Admin',
};

export default async function NewPackagePage() {
  const rows = await getPackagesAdmin();
  const knownTags = knownTagValues(rows);
  const nextSortOrder = rows.reduce((m: number, r: any) => Math.max(m, r.sort_order ?? 0), -1) + 1;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">New Package</h1>
      <PackageEditor pkg={null} knownTags={knownTags} nextSortOrder={nextSortOrder} />
    </div>
  );
}
