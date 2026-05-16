import { useState } from 'react';
import { MessageSquare, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { laporanWargaData } from '../data/dummyData';

export default function LaporanWarga() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    kategori: '',
    wilayah: '',
    sekolah: '',
    deskripsi: '',
    nama: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan Warga</h1>
          <p className="text-slate-500 text-sm mt-1">Laporan dan pengaduan masyarakat terkait program MBG</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#1B4F72] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#154060] transition-colors"
        >
          <Send size={16} />
          Buat Laporan Baru
        </button>
      </div>

      {submitted && (
        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 flex items-center gap-3">
          <CheckCircle size={18} />
          Laporan berhasil dikirim! ID laporan Anda: LW-2025-011. Kami akan merespon dalam 2-3 hari kerja.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Laporan" value={laporanWargaData.headerStats.totalLaporan.toLocaleString('id-ID')} icon={MessageSquare} iconColor="bg-blue-100" iconTextColor="text-blue-600" />
        <StatCard title="Dalam Proses" value={laporanWargaData.headerStats.diproses.toLocaleString('id-ID')} icon={Clock} iconColor="bg-amber-100" iconTextColor="text-amber-600" />
        <StatCard title="Sudah Selesai" value={laporanWargaData.headerStats.selesai.toLocaleString('id-ID')} icon={CheckCircle} iconColor="bg-emerald-100" iconTextColor="text-emerald-600" />
        <StatCard title="Rata-rata Respons" value={laporanWargaData.headerStats.waktuRespon} icon={AlertCircle} iconColor="bg-purple-100" iconTextColor="text-purple-600" subtitle="hari kerja" />
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-4">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Form Laporan Warga</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Kategori Laporan *</label>
              <select
                required
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.kategori}
                onChange={e => setForm({...form, kategori: e.target.value})}
              >
                <option value="">Pilih Kategori</option>
                <option>Kualitas Makanan</option>
                <option>Keterlambatan Distribusi</option>
                <option>Porsi Tidak Sesuai</option>
                <option>Kebersihan Kemasan</option>
                <option>Data Tidak Akurat</option>
                <option>SPPG Tidak Beroperasi</option>
                <option>Alergi Tidak Tercantum</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Wilayah *</label>
              <select
                required
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.wilayah}
                onChange={e => setForm({...form, wilayah: e.target.value})}
              >
                <option value="">Pilih Provinsi</option>
                <option>DKI Jakarta</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
                <option>Jawa Timur</option>
                <option>Sumatera Utara</option>
                <option>Sulawesi Selatan</option>
                <option>NTT</option>
                <option>Papua</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Nama Sekolah *</label>
              <input
                required
                type="text"
                placeholder="Contoh: SDN 05 Menteng"
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.sekolah}
                onChange={e => setForm({...form, sekolah: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Nama Pelapor</label>
              <input
                type="text"
                placeholder="Opsional (bisa anonim)"
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.nama}
                onChange={e => setForm({...form, nama: e.target.value})}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Deskripsi Laporan *</label>
              <textarea
                required
                rows={4}
                placeholder="Jelaskan masalah yang Anda temukan secara detail..."
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={form.deskripsi}
                onChange={e => setForm({...form, deskripsi: e.target.value})}
              />
            </div>
            <div className="col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-[#1B4F72] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#154060] transition-colors flex items-center gap-2"
              >
                <Send size={15} />
                Kirim Laporan
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border border-slate-200 text-slate-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Charts + Table */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Laporan per Kategori</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={laporanWargaData.kategoriData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="kategori" type="category" tick={{ fontSize: 9 }} width={110} />
              <Tooltip />
              <Bar dataKey="jumlah" fill="#1B4F72" radius={[0, 3, 3, 0]} name="Jumlah" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">Statistik Status</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Menunggu', value: 115, color: 'bg-slate-200', text: 'text-slate-600' },
              { label: 'Diproses', value: 389, color: 'bg-blue-200', text: 'text-blue-700' },
              { label: 'Selesai', value: 743, color: 'bg-emerald-200', text: 'text-emerald-700' },
            ].map(s => (
              <div key={s.label} className={`${s.color} rounded-xl p-4 text-center`}>
                <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
                <p className={`text-xs font-medium ${s.text} mt-1`}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Tingkat Penyelesaian</span>
              <span className="font-semibold text-slate-700">59.6%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full">
              <div className="h-3 rounded-full bg-emerald-500" style={{ width: '59.6%' }} />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Rata-rata Waktu Respons</span>
              <span className="font-semibold text-slate-700">2.3 hari</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Daftar Laporan Terkini</h2>
          <div className="flex gap-2">
            <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50">
              <option>Semua Status</option>
              <option>Menunggu</option>
              <option>Diproses</option>
              <option>Selesai</option>
            </select>
            <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50">
              <option>Semua Prioritas</option>
              <option>Tinggi</option>
              <option>Sedang</option>
              <option>Rendah</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">ID LAPORAN</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">TANGGAL</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">KATEGORI</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">LOKASI</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">PRIORITAS</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {laporanWargaData.laporan.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-mono text-xs text-blue-600 font-medium">{l.id}</td>
                  <td className="px-5 py-3 text-slate-500 text-xs">{l.tanggal}</td>
                  <td className="px-5 py-3 text-slate-700 text-xs">{l.kategori}</td>
                  <td className="px-5 py-3 text-slate-600 text-xs">{l.lokasi}</td>
                  <td className="px-5 py-3"><StatusBadge status={l.prioritas} /></td>
                  <td className="px-5 py-3"><StatusBadge status={l.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
