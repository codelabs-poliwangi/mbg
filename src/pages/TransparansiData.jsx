import { Database, TrendingUp, FileText, Eye, Download } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { transparansiData } from '../data/dummyData';

export default function TransparansiData() {
  const { headerStats, statusDataset, trendSkor, daftarDataset, gapTracker } = transparansiData;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Transparansi Data</h1>
        <p className="text-slate-500 text-sm mt-1">Keterbukaan data program MBG berdasarkan standar Open Government Data</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Skor Transparansi</p>
          <div className="flex items-end gap-1 mt-1">
            <span className="text-3xl font-bold text-[#1B4F72]">{headerStats.skorTransparansi}</span>
            <span className="text-slate-400 text-sm mb-1">/100</span>
          </div>
          <div className="mt-2 h-2 bg-slate-100 rounded-full">
            <div className="h-2 rounded-full bg-[#1B4F72]" style={{ width: `${headerStats.skorTransparansi}%` }} />
          </div>
        </div>
        <StatCard title="Dataset Terbuka" value={`${headerStats.datasetTerbuka}%`} icon={Database} iconColor="bg-teal-100" iconTextColor="text-teal-600" />
        <StatCard title="Total Dataset" value={headerStats.totalDataset} icon={FileText} iconColor="bg-purple-100" iconTextColor="text-purple-600" />
        <StatCard title="Terakhir Diperbarui" value="21 Mei 2025" icon={TrendingUp} iconColor="bg-orange-100" iconTextColor="text-orange-600" subtitle="09:30 WIB" />
      </div>

      {/* Charts + Gap Tracker */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Status Donut */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Status Dataset</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={statusDataset}
                cx="50%" cy="50%"
                innerRadius={50} outerRadius={75}
                dataKey="value"
                labelLine={false}
              >
                {statusDataset.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v, name) => [`${v} dataset`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {statusDataset.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-700">{item.value} ({item.pct}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-1">Tren Skor Transparansi</h2>
          <p className="text-xs text-slate-400 mb-4">Des 2024 – Mei 2025</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendSkor}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} domain={[40, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="skor" stroke="#1B4F72" strokeWidth={2.5} dot={{ r: 4, fill: '#1B4F72' }} name="Skor" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gap Tracker */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <Eye size={15} className="text-orange-500" />
            Data Gap Tracker
          </h2>
          <p className="text-xs text-slate-400 mb-4">Topik dengan kebutuhan data terbesar</p>
          <div className="space-y-4">
            {gapTracker.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600 font-medium">{item.topik}</span>
                  <span className="font-bold text-slate-800">{item.pct}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full">
                  <div
                    className="h-2.5 rounded-full transition-all"
                    style={{
                      width: `${item.pct}%`,
                      background: item.pct >= 70 ? '#EF4444' : item.pct >= 55 ? '#F59E0B' : '#1B4F72'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">* Persentase menunjukkan tingkat kebutuhan data publik</p>
        </div>
      </div>

      {/* Dataset Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Daftar Dataset</h2>
          <div className="flex gap-2">
            <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50">
              <option>Semua Kategori</option>
              <option>Infrastruktur</option>
              <option>Penerima</option>
              <option>Keuangan</option>
              <option>Keamanan</option>
              <option>Kelembagaan</option>
            </select>
            <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50">
              <option>Semua Status</option>
              <option>Terbuka</option>
              <option>Sebagian Terbuka</option>
              <option>Terbatas</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">NAMA DATASET</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">KATEGORI</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">PENANGGUNG JAWAB</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">DIPERBARUI</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">STATUS</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {daftarDataset.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-800 text-xs">{d.nama}</td>
                  <td className="px-5 py-3 text-slate-500 text-xs">{d.kategori}</td>
                  <td className="px-5 py-3 text-slate-600 text-xs font-medium">{d.penanggungjawab}</td>
                  <td className="px-5 py-3 text-slate-500 text-xs">{d.diperbarui}</td>
                  <td className="px-5 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      {d.status !== 'Tertutup' && (
                        <>
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={13} />
                          </button>
                          <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                            <Download size={13} />
                          </button>
                        </>
                      )}
                      {d.status === 'Tertutup' && (
                        <span className="text-xs text-slate-400 italic">Tidak tersedia</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
