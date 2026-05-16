import { DollarSign, TrendingUp, Target, BarChart2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import StatCard from '../components/StatCard';
import { penyaluranDanaData, formatCurrency, formatNumber } from '../data/dummyData';

export default function PenyaluranDana() {
  const { headerStats, monthlyData, byProvinsi } = penyaluranDanaData;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Penyaluran Dana</h1>
        <p className="text-slate-500 text-sm mt-1">Realisasi anggaran dan penyaluran dana program MBG tahun 2025</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Anggaran"
          value={formatCurrency(headerStats.totalAnggaran)}
          icon={DollarSign}
          iconColor="bg-blue-100" iconTextColor="text-blue-600"
          subtitle="APBN 2025"
        />
        <StatCard
          title="Dana Tersalur"
          value={formatCurrency(headerStats.danaTersalur)}
          icon={TrendingUp}
          iconColor="bg-teal-100" iconTextColor="text-teal-600"
          change={`${headerStats.serapanDana}% dari target`}
        />
        <StatCard
          title="Efisiensi Anggaran"
          value={`${headerStats.efisiensi}%`}
          icon={Target}
          iconColor="bg-purple-100" iconTextColor="text-purple-600"
          subtitle="Dari anggaran operasional"
        />
        <StatCard
          title="Serapan Dana"
          value={`${headerStats.serapanDana}%`}
          icon={BarChart2}
          iconColor="bg-orange-100" iconTextColor="text-orange-600"
          change="+3.4% dari bulan lalu"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-1">Realisasi Bulanan (Miliar Rp)</h2>
          <p className="text-xs text-slate-400 mb-4">Jan – Mei 2025</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v, name) => [`Rp ${v} M`, name]} />
              <Legend />
              <Bar dataKey="anggaran" fill="#BFDBFE" name="Anggaran" radius={[3, 3, 0, 0]} />
              <Bar dataKey="tersalur" fill="#1B4F72" name="Tersalur" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Serapan Progress */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Serapan Dana per Bulan</h2>
          <div className="space-y-4">
            {monthlyData.filter(m => m.tersalur > 0).map((m) => {
              const pct = Math.round((m.tersalur / m.anggaran) * 100);
              return (
                <div key={m.bulan}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600 font-medium">{m.bulan}</span>
                    <span className="font-bold text-slate-800">{pct}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: pct >= 90 ? '#10B981' : pct >= 80 ? '#1B4F72' : '#F59E0B'
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-slate-400">
                    <span>Tersalur: Rp {m.tersalur} M</span>
                    <span>Target: Rp {m.anggaran} M</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* By Province Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Penyaluran Dana per Provinsi</h2>
          <button className="text-xs text-[#1B4F72] font-medium hover:underline">Unduh Data</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">PROVINSI</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">TOTAL ANGGARAN</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">DANA TERSALUR</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">SERAPAN</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 w-36">PROGRESS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {byProvinsi.map((r) => (
                <tr key={r.provinsi} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-800">{r.provinsi}</td>
                  <td className="px-5 py-3 text-slate-600">{formatCurrency(r.anggaran)}</td>
                  <td className="px-5 py-3 text-slate-600">{formatCurrency(r.tersalur)}</td>
                  <td className="px-5 py-3">
                    <span className={`font-semibold ${r.serapan >= 90 ? 'text-emerald-600' : r.serapan >= 80 ? 'text-blue-600' : 'text-amber-600'}`}>
                      {r.serapan}%
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${r.serapan}%`,
                          background: r.serapan >= 90 ? '#10B981' : r.serapan >= 80 ? '#1B4F72' : '#F59E0B'
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-xl">
          <div className="flex gap-8">
            <div>
              <p className="text-xs text-slate-500">Total Anggaran Nasional</p>
              <p className="text-lg font-bold text-slate-800">{formatCurrency(headerStats.totalAnggaran)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Total Dana Tersalur</p>
              <p className="text-lg font-bold text-[#1B4F72]">{formatCurrency(headerStats.danaTersalur)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Rata-rata Serapan</p>
              <p className="text-lg font-bold text-emerald-600">{headerStats.serapanDana}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
