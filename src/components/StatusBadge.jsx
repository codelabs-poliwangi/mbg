const statusConfig = {
  'Operasional': 'bg-emerald-100 text-emerald-700',
  'Dalam Proses': 'bg-amber-100 text-amber-700',
  'Perencanaan': 'bg-blue-100 text-blue-700',
  'Terverifikasi': 'bg-emerald-100 text-emerald-700',
  'Dalam Verifikasi': 'bg-amber-100 text-amber-700',
  'Ditolak': 'bg-red-100 text-red-700',
  'Tinggi': 'bg-red-100 text-red-700',
  'Sedang': 'bg-orange-100 text-orange-700',
  'Rendah': 'bg-blue-100 text-blue-700',
  'Terbuka': 'bg-emerald-100 text-emerald-700',
  'Sebagian Terbuka': 'bg-amber-100 text-amber-700',
  'Terbatas': 'bg-orange-100 text-orange-700',
  'Tertutup': 'bg-red-100 text-red-700',
  'Lulus': 'bg-emerald-100 text-emerald-700',
  'Gagal': 'bg-red-100 text-red-700',
  'Selesai': 'bg-emerald-100 text-emerald-700',
  'Diproses': 'bg-blue-100 text-blue-700',
  'Menunggu': 'bg-slate-100 text-slate-600',
  'Disetujui': 'bg-emerald-100 text-emerald-700',
  'Diajukan': 'bg-blue-100 text-blue-700',
};

export default function StatusBadge({ status }) {
  const cls = statusConfig[status] || 'bg-slate-100 text-slate-600';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}
