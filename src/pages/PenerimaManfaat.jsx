import { Users, School, Percent, Activity } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import StatCard from '../components/StatCard';
import { penerimaManfaatData, formatNumber } from '../data/dummyData';

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (value < 3) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight="600">
      {value}%
    </text>
  );
};

export default function PenerimaManfaat() {
  const { headerStats, byJenjang, byStatus, kondisiKhusus, regionalData, distribusiSasaran, kesenjangan } = penerimaManfaatData;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Penerima Manfaat</h1>
        <p className="text-slate-500 text-sm mt-1">Data siswa dan sekolah penerima program Makan Bergizi Gratis</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Sekolah Penerima" value={formatNumber(headerStats.sekolahPenerima)} icon={School} iconColor="bg-blue-100" iconTextColor="text-blue-600" />
        <StatCard title="Penerima Manfaat" value={formatNumber(headerStats.penerimManfaat)} icon={Users} iconColor="bg-teal-100" iconTextColor="text-teal-600" />
        <StatCard title="Cakupan Sekolah" value={`${headerStats.cakupanSekolah}%`} icon={Percent} iconColor="bg-purple-100" iconTextColor="text-purple-600" />
        <StatCard title="Beban per SPPG" value={formatNumber(headerStats.bebanPerSPPG)} icon={Activity} iconColor="bg-orange-100" iconTextColor="text-orange-600" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Jenjang Donut */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Penerima per Jenjang Pendidikan</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={byJenjang}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={85}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {byJenjang.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {byJenjang.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-600">{item.name} <span className="font-semibold">{item.value}%</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Negeri vs Swasta */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Negeri vs Swasta</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={byStatus}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={85}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {byStatus.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2">
            {byStatus.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-600">{item.name} <span className="font-semibold">{item.value}%</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribusi Sasaran */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Distribusi Sasaran</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={distribusiSasaran}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={85}
                dataKey="value"
                labelLine={false}
                label={({ value, name }) => value > 2 ? `${value}%` : ''}
              >
                {distribusiSasaran.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 gap-1 mt-2">
            {distribusiSasaran.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-600">{item.name} <span className="font-semibold">{item.value}%</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Kondisi Khusus */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Penerima dengan Kondisi Khusus</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={kondisiKhusus} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => (v / 1000).toFixed(0) + 'rb'} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={130} />
              <Tooltip formatter={(v) => formatNumber(v)} />
              <Bar dataKey="value" fill="#1B4F72" radius={[0, 4, 4, 0]} name="Jumlah" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Kesenjangan Wilayah */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-2">Kesenjangan Cakupan Wilayah</h2>
          <div className="flex gap-4 mb-4">
            <div className="bg-emerald-50 rounded-lg p-3 flex-1 text-center">
              <p className="text-xs text-slate-500">Tertinggi</p>
              <p className="text-lg font-bold text-emerald-600">{kesenjangan.tertinggi.nilai}%</p>
              <p className="text-xs text-slate-600">{kesenjangan.tertinggi.provinsi}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 flex-1 text-center">
              <p className="text-xs text-slate-500">Terendah</p>
              <p className="text-lg font-bold text-red-600">{kesenjangan.terendah.nilai}%</p>
              <p className="text-xs text-slate-600">{kesenjangan.terendah.provinsi}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 flex-1 text-center">
              <p className="text-xs text-slate-500">Gap</p>
              <p className="text-lg font-bold text-orange-600">{kesenjangan.gap} pp</p>
              <p className="text-xs text-slate-600">Perlu perhatian</p>
            </div>
          </div>
          <div className="space-y-2">
            {regionalData.slice(0, 6).map(r => (
              <div key={r.provinsi} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-28 flex-shrink-0">{r.provinsi}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${r.cakupan}%`,
                      background: r.cakupan >= 80 ? '#10B981' : r.cakupan >= 70 ? '#F59E0B' : '#EF4444'
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 w-12 text-right">{r.cakupan}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">Perbandingan Regional</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">PROVINSI</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">SEKOLAH</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">PENERIMA</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">CAKUPAN</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 w-40">PROGRESS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {regionalData.map((r) => (
                <tr key={r.provinsi} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-800">{r.provinsi}</td>
                  <td className="px-5 py-3 text-slate-600">{formatNumber(r.sekolah)}</td>
                  <td className="px-5 py-3 text-slate-600">{formatNumber(r.penerima)}</td>
                  <td className="px-5 py-3 font-semibold text-slate-800">{r.cakupan}%</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${r.cakupan}%`,
                            background: r.cakupan >= 80 ? '#10B981' : r.cakupan >= 70 ? '#F59E0B' : '#EF4444'
                          }}
                        />
                      </div>
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
