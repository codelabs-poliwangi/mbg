import { ShieldCheck, XCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar,
} from 'recharts';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { keamananPanganData, formatNumber } from '../data/dummyData';

export default function KeamananPangan() {
  const { headerStats, trendData, inspeksiData, kategoriPelanggaran } = keamananPanganData;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Keamanan Pangan</h1>
        <p className="text-slate-500 text-sm mt-1">Monitoring inspeksi keamanan dan sanitasi pangan SPPG</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Inspeksi Dilakukan"
          value={formatNumber(headerStats.inspeksiDilakukan)}
          icon={ShieldCheck}
          iconColor="bg-blue-100" iconTextColor="text-blue-600"
        />
        <StatCard
          title="Tingkat Lolos"
          value={`${headerStats.tingkatLolos}%`}
          icon={CheckCircle}
          iconColor="bg-emerald-100" iconTextColor="text-emerald-600"
          change="+0.3% dari bulan lalu"
        />
        <StatCard
          title="Pelanggaran Ditemukan"
          value={formatNumber(headerStats.pelanggaranDitemukan)}
          icon={XCircle}
          iconColor="bg-red-100" iconTextColor="text-red-600"
        />
        <StatCard
          title="Tindak Lanjut"
          value={`${headerStats.tindakLanjut}%`}
          icon={AlertTriangle}
          iconColor="bg-amber-100" iconTextColor="text-amber-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Trend Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-1">Tren Tingkat Kelulusan Inspeksi</h2>
          <p className="text-xs text-slate-400 mb-4">Des 2024 – Mei 2025 (%)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[80, 100]} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />
              <Line type="monotone" dataKey="lolos" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} name="Lulus (%)" />
              <Line type="monotone" dataKey="gagal" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Gagal (%)" strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Kategori Pelanggaran */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-1">Kategori Pelanggaran</h2>
          <p className="text-xs text-slate-400 mb-4">Berdasarkan jenis temuan inspeksi</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={kategoriPelanggaran} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="kategori" type="category" tick={{ fontSize: 10 }} width={110} />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#EF4444" radius={[0, 4, 4, 0]} name="Pelanggaran" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Skor Rata-rata', value: '87.3', unit: '/100', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'SPPG Lolos', value: '1,685', unit: 'SPPG', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'SPPG Gagal', value: '162', unit: 'SPPG', color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Inspeksi Ulang', value: '98', unit: 'SPPG', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
            <p className="text-xs text-slate-500">{s.label}</p>
            <div className="flex items-end gap-1 mt-1">
              <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
              <span className="text-xs text-slate-400 mb-1">{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Inspeksi Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Hasil Inspeksi Terkini</h2>
          <div className="flex gap-2">
            <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50">
              <option>Semua Hasil</option>
              <option>Lulus</option>
              <option>Gagal</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">NAMA SPPG</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">TGL INSPEKSI</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">HASIL</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">SKOR</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">CATATAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inspeksiData.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-800">{item.sppg}</td>
                  <td className="px-5 py-3 text-slate-500 text-xs">{item.tanggal}</td>
                  <td className="px-5 py-3"><StatusBadge status={item.hasil} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${item.skor >= 85 ? 'text-emerald-600' : item.skor >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                        {item.skor}
                      </span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${item.skor}%`,
                            background: item.skor >= 85 ? '#10B981' : item.skor >= 70 ? '#F59E0B' : '#EF4444'
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500 text-xs">{item.catatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
