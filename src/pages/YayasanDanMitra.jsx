import { useState } from 'react';
import { Building2, CheckCircle, Map, Users } from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { yayasanData } from '../data/dummyData';

const NODE_POSITIONS = {
  y1: { x: 150, y: 80 },
  y2: { x: 350, y: 60 },
  y3: { x: 250, y: 200 },
  m1: { x: 50, y: 190 },
  m2: { x: 450, y: 170 },
  m3: { x: 500, y: 60 },
  s1: { x: 80, y: 60 },
  s2: { x: 220, y: 30 },
  s3: { x: 420, y: 200 },
  s4: { x: 300, y: 280 },
};

const NODE_COLORS = {
  yayasan: '#1B4F72',
  mitra: '#059669',
  sppg: '#D97706',
};

export default function YayasanDanMitra() {
  const [selectedYayasan, setSelectedYayasan] = useState(yayasanData.profileYayasan);
  const { headerStats, daftarYayasan, relasiData } = yayasanData;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Yayasan dan Mitra</h1>
        <p className="text-slate-500 text-sm mt-1">Data yayasan, mitra, dan pengelola SPPG program MBG</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Yayasan" value={headerStats.totalYayasan.toLocaleString('id-ID')} icon={Building2} iconColor="bg-blue-100" iconTextColor="text-blue-600" />
        <StatCard title="Total Mitra" value={headerStats.totalMitra.toLocaleString('id-ID')} icon={Users} iconColor="bg-teal-100" iconTextColor="text-teal-600" />
        <StatCard title="SPPG Dikelola" value={headerStats.sppgDikelola.toLocaleString('id-ID')} icon={Map} iconColor="bg-purple-100" iconTextColor="text-purple-600" />
        <StatCard title="Data Terverifikasi" value={headerStats.dataVerifikasi.toLocaleString('id-ID')} icon={CheckCircle} iconColor="bg-emerald-100" iconTextColor="text-emerald-600" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        {/* Yayasan List */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Daftar Yayasan & Mitra</h2>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 480 }}>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">NAMA</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">SPPG</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {daftarYayasan.map((y) => (
                  <tr
                    key={y.id}
                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${selectedYayasan?.nama === y.nama ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedYayasan(y.nama === yayasanData.profileYayasan.nama ? yayasanData.profileYayasan : { ...yayasanData.profileYayasan, nama: y.nama, jumlahSPPG: y.jumlahSPPG, wilayahOperasi: [y.wilayah], statusVerifikasi: y.status })}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800 text-xs">{y.nama}</p>
                      <p className="text-slate-400 text-xs">{y.badanHukum} · {y.wilayah}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{y.jumlahSPPG}</td>
                    <td className="px-4 py-3"><StatusBadge status={y.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile Card */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">{selectedYayasan.nama}</h2>
                <p className="text-sm text-slate-500">
                  {selectedYayasan.badanHukum || 'Yayasan'} · {Array.isArray(selectedYayasan.wilayahOperasi) ? selectedYayasan.wilayahOperasi.join(', ') : selectedYayasan.wilayahOperasi}
                </p>
              </div>
              <StatusBadge status={selectedYayasan.statusVerifikasi || selectedYayasan.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {selectedYayasan.noRegistrasi && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-0.5">No. Registrasi</p>
                  <p className="text-xs font-medium text-slate-700">{selectedYayasan.noRegistrasi}</p>
                </div>
              )}
              {selectedYayasan.alamat && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-0.5">Alamat</p>
                  <p className="text-xs font-medium text-slate-700">{selectedYayasan.alamat}</p>
                </div>
              )}
              {selectedYayasan.namaKetua && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-0.5">Ketua</p>
                  <p className="text-xs font-medium text-slate-700">{selectedYayasan.namaKetua}</p>
                </div>
              )}
              {selectedYayasan.email && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-0.5">Email</p>
                  <p className="text-xs font-medium text-slate-700">{selectedYayasan.email}</p>
                </div>
              )}
            </div>

            {/* SPPG List */}
            {selectedYayasan.sppgList && (
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  SPPG yang Dikelola ({selectedYayasan.jumlahSPPG})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedYayasan.sppgList.map((s, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Catatan Laporan */}
            {selectedYayasan.catatanLaporan && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-600 mb-2">Catatan Laporan Terkait</p>
                <div className="space-y-2">
                  {selectedYayasan.catatanLaporan.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-xs font-medium text-slate-700">{c.judul}</p>
                        <p className="text-xs text-slate-400">{c.tanggal}</p>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
        <h2 className="text-sm font-semibold text-slate-700 mb-1">Peta Relasi SPPG–Yayasan–Mitra</h2>
        <p className="text-xs text-slate-400 mb-4">Visualisasi jaringan hubungan kelembagaan program MBG</p>

        <div className="flex gap-6 items-start">
          {/* SVG Diagram */}
          <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden" style={{ height: 320 }}>
            <svg viewBox="0 0 560 320" className="w-full h-full">
              {/* Edges */}
              {relasiData.edges.map((e, i) => {
                const from = NODE_POSITIONS[e.from];
                const to = NODE_POSITIONS[e.to];
                return (
                  <line
                    key={i}
                    x1={from.x} y1={from.y}
                    x2={to.x} y2={to.y}
                    stroke="#CBD5E1" strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                );
              })}
              {/* Nodes */}
              {relasiData.nodes.map((n) => {
                const pos = NODE_POSITIONS[n.id];
                const color = NODE_COLORS[n.type];
                const r = n.type === 'mitra' ? 18 : n.type === 'yayasan' ? 22 : 15;
                return (
                  <g key={n.id}>
                    <circle cx={pos.x} cy={pos.y} r={r} fill={color} opacity={0.9} />
                    <text
                      x={pos.x} y={pos.y + r + 12}
                      textAnchor="middle" fontSize="9" fill="#334155" fontWeight="500"
                    >
                      {n.label}
                    </text>
                    <text x={pos.x} y={pos.y + 3} textAnchor="middle" fontSize="8" fill="white" fontWeight="600">
                      {n.type === 'yayasan' ? 'Y' : n.type === 'mitra' ? 'M' : 'S'}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="w-48 space-y-3">
            <h3 className="text-xs font-semibold text-slate-600">Legenda</h3>
            {[
              { color: NODE_COLORS.yayasan, label: 'Yayasan/Mitra Pengelola', code: 'Y' },
              { color: NODE_COLORS.mitra, label: 'Lembaga Mitra', code: 'M' },
              { color: NODE_COLORS.sppg, label: 'SPPG', code: 'S' },
            ].map(l => (
              <div key={l.code} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: l.color }}>
                  {l.code}
                </div>
                <span className="text-xs text-slate-600">{l.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 mt-2">
              <div className="w-7 h-px bg-slate-300 border-t border-dashed border-slate-400" />
              <span className="text-xs text-slate-500">Hubungan Kerja Sama</span>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              Total {relasiData.nodes.filter(n => n.type === 'yayasan').length} yayasan, {relasiData.nodes.filter(n => n.type === 'mitra').length} mitra, {relasiData.nodes.filter(n => n.type === 'sppg').length} SPPG ditampilkan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
