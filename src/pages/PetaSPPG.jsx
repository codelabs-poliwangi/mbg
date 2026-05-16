import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, RefreshCw, Search, Download, Eye, Building2, MapPin, BarChart3, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatusBadge from '../components/StatusBadge';
import IndonesiaMap from '../components/IndonesiaMap';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import { useToast } from '../contexts/ToastContext';
import { sppgData } from '../data/dummyData';
import { provinsiList, kabupatenByProvinsi, kecamatanByKabupaten } from '../data/wilayah';

const PAGE_SIZE = 10;
const DATE_OPTIONS = [
  { value: '', label: 'Semua Tanggal' },
  { value: '7', label: '7 hari terakhir' },
  { value: '30', label: '30 hari terakhir' },
  { value: '90', label: '90 hari terakhir' },
];

function parseDateID(str) {
  if (!str) return null;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const parts = str.split(' ');
  if (parts.length < 3) return null;
  const day = parseInt(parts[0], 10);
  const monthIdx = months.findIndex((m) => parts[1].startsWith(m));
  const year = parseInt(parts[2], 10);
  if (monthIdx < 0) return null;
  return new Date(year, monthIdx, day);
}

export default function PetaSPPG() {
  const toast = useToast();
  const [filters, setFilters] = useState({
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    status: '',
    tanggal: '',
    search: '',
  });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const setFilter = (key, value) => {
    setFilters((f) => {
      const next = { ...f, [key]: value };
      if (key === 'provinsi') { next.kabupaten = ''; next.kecamatan = ''; }
      if (key === 'kabupaten') { next.kecamatan = ''; }
      return next;
    });
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({ provinsi: '', kabupaten: '', kecamatan: '', status: '', tanggal: '', search: '' });
    setPage(1);
    toast.info('Filter direset.');
  };

  const filtered = useMemo(() => {
    const now = new Date('2025-05-21');
    return sppgData.daftarSPPG.filter((s) => {
      if (filters.provinsi && !s.wilayah.includes(filters.provinsi)) return false;
      if (filters.kabupaten && !s.wilayah.toLowerCase().includes(filters.kabupaten.toLowerCase())) return false;
      if (filters.status && s.status !== filters.status) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!s.nama.toLowerCase().includes(q) && !s.wilayah.toLowerCase().includes(q) && !s.yayasan.toLowerCase().includes(q)) return false;
      }
      if (filters.tanggal) {
        const d = parseDateID(s.update);
        if (!d) return false;
        const diffDays = (now - d) / (1000 * 60 * 60 * 24);
        if (diffDays > parseInt(filters.tanggal, 10)) return false;
      }
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages, page]);

  const mapData = useMemo(() => {
    if (!filters.provinsi) return provinsiList;
    return provinsiList.filter((p) => p.nama === filters.provinsi);
  }, [filters.provinsi]);

  const kabupatenOptions = filters.provinsi ? (kabupatenByProvinsi[filters.provinsi] || []) : [];
  const kecamatanOptions = filters.kabupaten ? (kecamatanByKabupaten[filters.kabupaten] || []) : [];

  const exportCSV = () => {
    const header = ['Nama', 'Wilayah', 'Status', 'Yayasan', 'Update'];
    const rows = filtered.map((s) => [s.nama, s.wilayah, s.status, s.yayasan, s.update]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daftar-sppg-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${filtered.length} baris diekspor ke CSV.`);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Peta SPPG</h1>
        <p className="text-slate-500 text-sm mt-1">
          Sebaran Satuan Pelayanan Pemenuhan Gizi (SPPG) seluruh Indonesia
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total SPPG', value: '2.417', change: '+128 (5,59%) dari bulan lalu', changePositive: true, icon: Building2, iconColor: 'bg-blue-100', iconTextColor: 'text-blue-600' },
          { title: 'Wilayah Terlayani', value: '412', subtitle: '18 provinsi, 276 kab/kota', icon: MapPin, iconColor: 'bg-teal-100', iconTextColor: 'text-teal-600' },
          { title: 'Rasio SPPG/Sekolah', value: '1 : 8,7', change: '0,6 lebih baik dari bulan lalu', changePositive: true, icon: BarChart3, iconColor: 'bg-purple-100', iconTextColor: 'text-purple-600' },
          { title: 'Wilayah Tanpa Data', value: '28', change: '3 (-9,68%) dari bulan lalu', changePositive: false, icon: AlertCircle, iconColor: 'bg-orange-100', iconTextColor: 'text-orange-500' },
        ].map((s) => (
          <div key={s.title} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-slate-500 font-medium">{s.title}</p>
                <p className={`text-[26px] font-bold mt-0.5 leading-none tracking-tight ${s.title === 'Wilayah Tanpa Data' ? 'text-red-600' : 'text-slate-800'}`}>{s.value}</p>
                {s.change && (
                  <p className={`text-[12px] font-semibold mt-1.5 ${s.changePositive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {s.changePositive ? '▲' : '▼'} {s.change}
                  </p>
                )}
                {!s.change && s.subtitle && <p className="text-[12px] text-slate-400 mt-1.5">{s.subtitle}</p>}
              </div>
              <div className={`w-12 h-12 ${s.iconColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <s.icon size={22} className={s.iconTextColor} strokeWidth={1.8} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-4 flex gap-3 flex-wrap items-center">
        <select value={filters.provinsi} onChange={(e) => setFilter('provinsi', e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Semua Provinsi</option>
          {provinsiList.map((p) => <option key={p.kode} value={p.nama}>{p.nama}</option>)}
        </select>
        <select value={filters.kabupaten} onChange={(e) => setFilter('kabupaten', e.target.value)} disabled={!filters.provinsi || kabupatenOptions.length === 0} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
          <option value="">{filters.provinsi ? 'Semua Kabupaten/Kota' : 'Pilih Provinsi dulu'}</option>
          {kabupatenOptions.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
        <select value={filters.kecamatan} onChange={(e) => setFilter('kecamatan', e.target.value)} disabled={!filters.kabupaten || kecamatanOptions.length === 0} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
          <option value="">{filters.kabupaten ? 'Semua Kecamatan' : 'Pilih Kab/Kota dulu'}</option>
          {kecamatanOptions.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
        <select value={filters.status} onChange={(e) => setFilter('status', e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Semua Status</option>
          <option>Operasional</option>
          <option>Dalam Proses</option>
          <option>Perencanaan</option>
        </select>
        <select value={filters.tanggal} onChange={(e) => setFilter('tanggal', e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {DATE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <button onClick={resetFilters} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
          <RefreshCw size={14} /> Reset Filter
        </button>
        {activeFilterCount > 0 && (
          <span className="ml-auto text-xs text-blue-600 font-medium">{activeFilterCount} filter aktif</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h2 className="text-sm font-semibold text-slate-700">Sebaran SPPG per Wilayah</h2>
            <div className="flex gap-3 text-xs">
              {[
                { color: '#F97316', label: '>100' },
                { color: '#EAB308', label: '51-100' },
                { color: '#22C55E', label: '11-50' },
                { color: '#3B82F6', label: '1-10' },
                { color: '#94A3B8', label: '0' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <IndonesiaMap
            data={mapData}
            height={360}
            onSelectProvinsi={(p) => setFilter('provinsi', p.nama)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 mb-1">Beban Layanan per SPPG</h2>
            <p className="text-xs text-slate-400 mb-3">Des 2024 – Mei 2025</p>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={sppgData.bebanLayanan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bulan" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} domain={[1000, 3000]} />
                <Tooltip />
                <Line type="monotone" dataKey="beban" stroke="#1B4F72" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <AlertTriangle size={15} className="text-orange-500" /> Gap Wilayah
            </h2>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-1.5 text-slate-500 font-medium">Provinsi</th>
                  <th className="text-left py-1.5 text-slate-500 font-medium">Rasio</th>
                  <th className="text-left py-1.5 text-slate-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {sppgData.gapWilayah.map((r, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer" onClick={() => setFilter('provinsi', r.provinsi)}>
                    <td className="py-1.5 text-slate-700 font-medium">{r.provinsi}</td>
                    <td className="py-1.5 text-slate-600">{r.rasio}</td>
                    <td className="py-1.5"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3 flex-wrap">
          <h2 className="text-sm font-semibold text-slate-700 flex-1">Daftar SPPG</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={filters.search} onChange={(e) => setFilter('search', e.target.value)} placeholder="Cari nama, wilayah, yayasan…" className="pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
            <Download size={14} /> Ekspor CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">NAMA SPPG</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">WILAYAH</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">STATUS</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">YAYASAN/MITRA</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">UPDATE</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pageData.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400 text-sm">Tidak ada SPPG yang cocok dengan filter.</td></tr>
              ) : pageData.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-800">{s.nama}</td>
                  <td className="px-5 py-3 text-slate-600">{s.wilayah}</td>
                  <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-3 text-slate-600">{s.yayasan}</td>
                  <td className="px-5 py-3 text-slate-500">{s.update}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setSelected(s)} className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                      <Eye size={12} /> Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} label="SPPG" />
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Detail SPPG" size="md">
        {selected && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{selected.nama}</h3>
              <p className="text-sm text-slate-500">{selected.wilayah}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Status Operasional</p>
                <div className="mt-1"><StatusBadge status={selected.status} /></div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">Update Terakhir</p>
                <p className="text-sm font-medium text-slate-800 mt-0.5">{selected.update}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg col-span-2">
                <p className="text-xs text-slate-500">Yayasan / Mitra Pengelola</p>
                <p className="text-sm font-medium text-slate-800 mt-0.5">{selected.yayasan}</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-xs text-blue-700 font-medium mb-2">Ringkasan Operasi</p>
              <ul className="text-sm text-slate-700 space-y-1.5">
                <li className="flex justify-between"><span className="text-slate-500">Kapasitas Harian</span><span className="font-medium">~1.500 porsi</span></li>
                <li className="flex justify-between"><span className="text-slate-500">Sekolah Dilayani</span><span className="font-medium">12 sekolah</span></li>
                <li className="flex justify-between"><span className="text-slate-500">Penerima Aktif</span><span className="font-medium">3.847 anak</span></li>
                <li className="flex justify-between"><span className="text-slate-500">Skor Inspeksi</span><span className="font-medium text-emerald-600">92 / 100</span></li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
