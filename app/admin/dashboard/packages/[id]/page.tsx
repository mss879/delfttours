import { notFound } from 'next/navigation';
import { getPackagesAdmin } from '@/app/actions/packages';
import { knownTagValues } from '@/app/tours/facets';
import PackageEditor from '@/components/admin/PackageEditor';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Edit Package | Delft Admin',
};

export default async function EditPackagePage({ params }: { params: { id: string } }) {
  const rows = await getPackagesAdmin();
  const pkg = rows.find((r: any) => r.id === params.id);

  if (!pkg) {
    notFound();
  }

  const knownTags = knownTagValues(rows);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Edit Package</h1>
      <PackageEditor pkg={pkg} knownTags={knownTags} nextSortOrder={pkg.sort_order ?? 0} />
    </div>
  );
}
