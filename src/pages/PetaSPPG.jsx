import { useState } from 'react';
import { Map, TrendingUp, AlertTriangle, Grid, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { sppgData } from '../data/dummyData';

const regionColors = {
  high: '#F97316',   // >100
  medium: '#EAB308', // 51-100
  low: '#22C55E',    // 11-50
  vlow: '#3B82F6',   // 1-10
  none: '#94A3B8',   // 0
};

const indonesiaRegions = [
  { name: 'Aceh', x: 5, y: 30, w: 60, h: 30, level: 'medium', count: 67 },
  { name: 'Sumatera Utara', x: 60, y: 35, w: 55, h: 28, level: 'high', count: 143 },
  { name: 'Sumatera Barat', x: 55, y: 62, w: 45, h: 25, level: 'medium', count: 78 },
  { name: 'Riau', x: 95, y: 48, w: 50, h: 35, level: 'medium', count: 89 },
  { name: 'Jambi', x: 85, y: 78, w: 48, h: 28, level: 'medium', count: 56 },
  { name: 'Sumatera Selatan', x: 90, y: 100, w: 60, h: 30, level: 'medium', count: 98 },
  { name: 'Bengkulu', x: 68, y: 95, w: 35, h: 28, level: 'low', count: 34 },
  { name: 'Lampung', x: 88, y: 125, w: 45, h: 28, level: 'medium', count: 67 },
  { name: 'Kepulauan Bangka', x: 115, y: 100, w: 35, h: 22, level: 'low', count: 28 },
  { name: 'DKI Jakarta', x: 140, y: 130, w: 20, h: 15, level: 'high', count: 187 },
  { name: 'Jawa Barat', x: 140, y: 140, w: 70, h: 30, level: 'high', count: 312 },
  { name: 'Jawa Tengah', x: 200, y: 135, w: 75, h: 32, level: 'high', count: 289 },
  { name: 'D.I. Yogyakarta', x: 210, y: 162, w: 30, h: 18, level: 'medium', count: 45 },
  { name: 'Jawa Timur', x: 265, y: 128, w: 80, h: 38, level: 'high', count: 301 },
  { name: 'Banten', x: 125, y: 140, w: 38, h: 25, level: 'medium', count: 72 },
  { name: 'Bali', x: 290, y: 162, w: 30, h: 22, level: 'medium', count: 51 },
  { name: 'NTB', x: 318, y: 155, w: 35, h: 28, level: 'medium', count: 63 },
  { name: 'NTT', x: 345, y: 148, w: 55, h: 35, level: 'low', count: 67 },
  { name: 'Kalimantan Barat', x: 165, y: 80, w: 80, h: 65, level: 'medium', count: 78 },
  { name: 'Kalimantan Tengah', x: 200, y: 62, w: 85, h: 45, level: 'medium', count: 89 },
  { name: 'Kalimantan Selatan', x: 250, y: 102, w: 55, h: 38, level: 'medium', count: 56 },
  { name: 'Kalimantan Timur', x: 265, y: 55, w: 70, h: 65, level: 'medium', count: 87 },
  { name: 'Kalimantan Utara', x: 290, y: 28, w: 55, h: 40, level: 'low', count: 34 },
  { name: 'Sulawesi Utara', x: 368, y: 68, w: 55, h: 22, level: 'low', count: 42 },
  { name: 'Gorontalo', x: 358, y: 88, w: 38, h: 18, level: 'low', count: 21 },
  { name: 'Sulawesi Tengah', x: 340, y: 75, w: 65, h: 48, level: 'low', count: 48 },
  { name: 'Sulawesi Selatan', x: 345, y: 118, w: 55, h: 50, level: 'medium', count: 98 },
  { name: 'Sulawesi Barat', x: 325, y: 100, w: 30, h: 40, level: 'low', count: 29 },
  { name: 'Sulawesi Tenggara', x: 375, y: 128, w: 45, h: 42, level: 'low', count: 35 },
  { name: 'Maluku', x: 410, y: 115, w: 55, h: 55, level: 'low', count: 31 },
  { name: 'Maluku Utara', x: 405, y: 68, w: 45, h: 50, level: 'low', count: 24 },
  { name: 'Papua Barat', x: 440, y: 105, w: 55, h: 55, level: 'vlow', count: 15 },
  { name: 'Papua', x: 480, y: 88, w: 80, h: 75, level: 'vlow', count: 23 },
  { name: 'Papua Tengah', x: 490, y: 130, w: 60, h: 50, level: 'vlow', count: 12 },
  { name: 'Papua Pegunungan', x: 510, y: 95, w: 55, h: 50, level: 'vlow', count: 8 },
  { name: 'Papua Selatan', x: 495, y: 162, w: 65, h: 40, level: 'vlow', count: 9 },
];

const PAGE_SIZE = 10;

export default function PetaSPPG() {
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const filtered = sppgData.daftarSPPG.filter(s => !filterStatus || s.status === filterStatus);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Peta SPPG</h1>
        <p className="text-slate-500 text-sm mt-1">Sebaran Satuan Pelayanan Pemenuhan Gizi (SPPG) seluruh Indonesia</p>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Total SPPG</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">2,417</p>
          <span className="text-xs text-emerald-600 font-medium">▲ +128 (5.59%)</span>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Wilayah Terlayani</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">412</p>
          <span className="text-xs text-slate-400">Kabupaten/Kota</span>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Rasio SPPG/Sekolah</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">1:8.7</p>
          <span className="text-xs text-slate-400">Rata-rata nasional</span>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Wilayah Tanpa Data</p>
          <p className="text-2xl font-bold text-red-600 mt-1">28</p>
          <span className="text-xs text-red-400">Perlu perhatian</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-4 flex gap-3 flex-wrap">
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
          <option>Semua Provinsi</option>
          <option>DKI Jakarta</option>
          <option>Jawa Barat</option>
          <option>Jawa Tengah</option>
        </select>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
          <option>Semua Kabupaten/Kota</option>
        </select>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
          <option>Semua Kecamatan</option>
        </select>
        <select
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50"
          value={filterStatus}
          onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
        >
          <option value="">Semua Status</option>
          <option>Operasional</option>
          <option>Dalam Proses</option>
          <option>Perencanaan</option>
        </select>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
          <option>Semua Tanggal</option>
          <option>Minggu ini</option>
          <option>Bulan ini</option>
        </select>
        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
          <RefreshCw size={14} />
          Reset Filter
        </button>
      </div>

      {/* Map + Charts Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Map */}
        <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-700">Sebaran SPPG per Wilayah</h2>
            <div className="flex gap-3 text-xs">
              {[
                { color: '#F97316', label: '>100' },
                { color: '#EAB308', label: '51-100' },
                { color: '#22C55E', label: '11-50' },
                { color: '#3B82F6', label: '1-10' },
                { color: '#94A3B8', label: '0' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                  <span className="text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SVG Map */}
          <div className="relative overflow-hidden rounded-lg bg-blue-50 border border-blue-100" style={{ height: 280 }}>
            <svg viewBox="0 0 600 220" className="w-full h-full" style={{ background: '#EBF5FB' }}>
              {indonesiaRegions.map((r) => (
                <g key={r.name}
                  onMouseEnter={() => setHoveredRegion(r)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className="cursor-pointer"
                >
                  <rect
                    x={r.x} y={r.y} width={r.w} height={r.h}
                    rx="3"
                    fill={regionColors[r.level]}
                    stroke="white"
                    strokeWidth="1"
                    opacity={hoveredRegion?.name === r.name ? 1 : 0.85}
                  />
                  {r.w > 40 && r.h > 20 && (
                    <text
                      x={r.x + r.w / 2} y={r.y + r.h / 2 + 3}
                      textAnchor="middle"
                      fontSize="6"
                      fill="white"
                      fontWeight="600"
                    >
                      {r.count}
                    </text>
                  )}
                </g>
              ))}
              {hoveredRegion && (
                <g>
                  <rect
                    x={Math.min(hoveredRegion.x + hoveredRegion.w / 2 - 50, 490)}
                    y={hoveredRegion.y - 30}
                    width="100" height="26"
                    rx="4" fill="#1B4F72"
                  />
                  <text
                    x={Math.min(hoveredRegion.x + hoveredRegion.w / 2, 540)}
                    y={hoveredRegion.y - 18}
                    textAnchor="middle" fontSize="7" fill="white" fontWeight="600"
                  >
                    {hoveredRegion.name}
                  </text>
                  <text
                    x={Math.min(hoveredRegion.x + hoveredRegion.w / 2, 540)}
                    y={hoveredRegion.y - 9}
                    textAnchor="middle" fontSize="6" fill="#93C6E0"
                  >
                    {hoveredRegion.count} SPPG
                  </text>
                </g>
              )}
            </svg>
            <div className="absolute bottom-2 right-2 text-xs text-slate-400">* Peta representasi skematik</div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-4">
          {/* Line Chart */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 mb-1">Beban Layanan per SPPG</h2>
            <p className="text-xs text-slate-400 mb-3">Des 2024 – Mei 2025</p>
            <ResponsiveContainer width="100%" height={130}>
              <LineChart data={sppgData.bebanLayanan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bulan" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} domain={[1000, 3000]} />
                <Tooltip />
                <Line type="monotone" dataKey="beban" stroke="#1B4F72" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gap Table */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <AlertTriangle size={15} className="text-orange-500" />
              Gap Wilayah
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
                  <tr key={i} className="border-b border-slate-50">
                    <td className="py-1.5 text-slate-700 font-medium">{r.provinsi}</td>
                    <td className="py-1.5 text-slate-600">{r.rasio}</td>
                    <td className="py-1.5">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SPPG Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">Daftar SPPG</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">NAMA SPPG</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">WILAYAH</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">STATUS</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">YAYASAN/MITRA</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">UPDATE TERAKHIR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pageData.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-800">{s.nama}</td>
                  <td className="px-5 py-3 text-slate-600">{s.wilayah}</td>
                  <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-3 text-slate-600">{s.yayasan}</td>
                  <td className="px-5 py-3 text-slate-500">{s.update}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Menampilkan {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} SPPG
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1.5 text-xs border rounded-lg ${page === i + 1 ? 'bg-[#1B4F72] text-white border-[#1B4F72]' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
