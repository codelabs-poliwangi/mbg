import { Home, Map, Users, DollarSign, Building2, MessageSquare, ShieldCheck, Database, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { formatCurrency, formatNumber, penyaluranDanaData, penerimaManfaatData } from '../data/dummyData';

const berandaStats = [
  { title: 'Total SPPG Aktif', value: '2,417', change: '+128 bulan ini', iconColor: 'bg-blue-100', iconTextColor: 'text-blue-600', icon: Map },
  { title: 'Penerima Manfaat', value: '3,847,126', change: '+24,321 pekan ini', iconColor: 'bg-teal-100', iconTextColor: 'text-teal-600', icon: Users },
  { title: 'Dana Tersalur', value: 'Rp 12,89 T', change: '84.8% dari target', iconColor: 'bg-purple-100', iconTextColor: 'text-purple-600', icon: DollarSign },
  { title: 'Sekolah Penerima', value: '18,732', change: '78.6% cakupan nasional', iconColor: 'bg-orange-100', iconTextColor: 'text-orange-600', icon: Building2 },
  { title: 'Laporan Warga', value: '1,247', change: '743 sudah ditindaklanjuti', iconColor: 'bg-red-100', iconTextColor: 'text-red-600', icon: MessageSquare },
  { title: 'Skor Transparansi', value: '78/100', change: '+6 poin bulan ini', iconColor: 'bg-emerald-100', iconTextColor: 'text-emerald-600', icon: Database },
  { title: 'Tingkat Keamanan Pangan', value: '91.3%', change: 'dari 1,847 inspeksi', iconColor: 'bg-indigo-100', iconTextColor: 'text-indigo-600', icon: ShieldCheck },
  { title: 'Mitra Terverifikasi', value: '1,973', change: 'dari 3,565 total', iconColor: 'bg-pink-100', iconTextColor: 'text-pink-600', icon: TrendingUp },
];

const monthlyData = [
  { bulan: 'Jan', anggaran: 2100, tersalur: 1890, penerima: 2.8 },
  { bulan: 'Feb', anggaran: 2200, tersalur: 2050, penerima: 3.1 },
  { bulan: 'Mar', anggaran: 2400, tersalur: 2180, penerima: 3.3 },
  { bulan: 'Apr', anggaran: 2500, tersalur: 2350, penerima: 3.6 },
  { bulan: 'Mei', anggaran: 2800, tersalur: 2420, penerima: 3.85 },
];

const recentAlerts = [
  { type: 'warning', msg: 'Gap tinggi: Papua Pegunungan rasio 1:23.5', time: '2 jam lalu' },
  { type: 'error', msg: 'SPPG Ternate gagal inspeksi keamanan pangan (skor 58)', time: '5 jam lalu' },
  { type: 'info', msg: 'Laporan warga baru: SDN 05 Menteng - Kualitas Makanan', time: '1 hari lalu' },
  { type: 'success', msg: 'Transparansi meningkat: skor 78/100 (+6 poin)', time: '1 hari lalu' },
];

export default function Beranda() {
  return (
    <div>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Beranda</h1>
        <p className="text-slate-500 text-sm mt-1">Ringkasan program Makan Bergizi Gratis secara nasional — per 21 Mei 2025</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {berandaStats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Monthly Bar Chart */}
        <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-1">Tren Dana Tersalur (Miliar Rp)</h2>
          <p className="text-xs text-slate-400 mb-4">Jan – Mei 2025</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `Rp ${v} M`} />
              <Bar dataKey="anggaran" fill="#BFDBFE" name="Anggaran" radius={[3,3,0,0]} />
              <Bar dataKey="tersalur" fill="#1B4F72" name="Tersalur" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <AlertCircle size={16} className="text-orange-500" />
            Peringatan & Notifikasi
          </h2>
          <div className="space-y-3">
            {recentAlerts.map((a, i) => (
              <div key={i} className={`p-3 rounded-lg text-xs border-l-4 ${
                a.type === 'warning' ? 'bg-amber-50 border-amber-400 text-amber-800' :
                a.type === 'error' ? 'bg-red-50 border-red-400 text-red-800' :
                a.type === 'success' ? 'bg-emerald-50 border-emerald-400 text-emerald-800' :
                'bg-blue-50 border-blue-400 text-blue-800'
              }`}>
                <p className="font-medium">{a.msg}</p>
                <p className="opacity-60 mt-0.5">{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Cards Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Cakupan per Jenjang</h3>
          {penerimaManfaatData.byJenjang.map((item) => (
            <div key={item.name} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">{item.name}</span>
                <span className="font-semibold text-slate-800">{item.value}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full">
                <div className="h-2 rounded-full transition-all" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Serapan Dana per Wilayah (Top 5)</h3>
          {penyaluranDanaData.byProvinsi.slice(0, 5).map((item) => (
            <div key={item.provinsi} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">{item.provinsi}</span>
                <span className="font-semibold text-slate-800">{item.serapan}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full">
                <div className="h-2 rounded-full bg-[#1B4F72] transition-all" style={{ width: `${item.serapan}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Status SPPG Nasional</h3>
          <div className="space-y-3">
            {[
              { label: 'Operasional', value: 1847, pct: 76, color: 'bg-emerald-500' },
              { label: 'Dalam Proses', value: 412, pct: 17, color: 'bg-amber-400' },
              { label: 'Perencanaan', value: 158, pct: 7, color: 'bg-blue-400' },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{s.label}</span>
                  <span className="font-semibold text-slate-800">{s.value.toLocaleString('id-ID')}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full">
                  <div className={`h-2 rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#1B4F72]">2,417</p>
              <p className="text-xs text-slate-500">Total SPPG Terdaftar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
