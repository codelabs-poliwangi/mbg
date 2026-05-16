import { useState } from 'react';
import { FileText, BookOpen, Radio, BarChart2, Scale, Search, Eye, Download } from 'lucide-react';
import { dokumenResmiData } from '../data/dummyData';
import { useToast } from '../contexts/ToastContext';
import Modal from '../components/Modal';

const iconMap = {
  Juknis: FileText,
  Pedoman: BookOpen,
  'Siaran Pers': Radio,
  'Dashboard Resmi': BarChart2,
  Regulasi: Scale,
};

const PAGE_SIZE = 8;

function parseTanggalID(s) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const [day, mon, year] = s.split(' ');
  const m = months.findIndex((x) => mon?.startsWith(x));
  return new Date(parseInt(year), m, parseInt(day)).getTime();
}

function parseUkuran(s) {
  const m = s.match(/([\d.]+)\s*(MB|KB|GB)/i);
  if (!m) return 0;
  const v = parseFloat(m[1]);
  return m[2].toUpperCase() === 'KB' ? v * 1024 : m[2].toUpperCase() === 'GB' ? v * 1024 * 1024 : v * 1024 * 1024;
}

export default function DokumenResmi() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('');
  const [jenis, setJenis] = useState('');
  const [sortBy, setSortBy] = useState('terbaru');
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState(null);

  let filtered = dokumenResmiData.dokumen.filter((d) =>
    (!search || d.nama.toLowerCase().includes(search.toLowerCase())) &&
    (!kategori || d.kategori === kategori) &&
    (!jenis || d.jenis === jenis)
  );
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'terbaru') return parseTanggalID(b.tanggal) - parseTanggalID(a.tanggal);
    if (sortBy === 'terlama') return parseTanggalID(a.tanggal) - parseTanggalID(b.tanggal);
    if (sortBy === 'nama') return a.nama.localeCompare(b.nama);
    if (sortBy === 'ukuran') return parseUkuran(b.ukuran) - parseUkuran(a.ukuran);
    return 0;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDownload = (d) => {
    const txt = `[DEMO] ${d.nama}\nKategori: ${d.kategori}\nTanggal: ${d.tanggal}\nUkuran: ${d.ukuran}\n\nFile asli tidak tersedia di mode demo.`;
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${d.nama.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Unduhan dimulai: ${d.nama}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dokumen Resmi</h1>
        <p className="text-slate-500 text-sm mt-1">Kumpulan dokumen resmi program MBG dari berbagai instansi</p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {dokumenResmiData.kategori.map((k) => {
          const Icon = iconMap[k.nama] || FileText;
          return (
            <button
              key={k.nama}
              onClick={() => { setKategori(kategori === k.nama ? '' : k.nama); setPage(1); }}
              className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${
                kategori === k.nama ? 'border-[#1B4F72] bg-blue-50' : 'border-slate-100 hover:border-blue-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                kategori === k.nama ? 'bg-[#1B4F72]' : 'bg-blue-50'
              }`}>
                <Icon size={20} className={kategori === k.nama ? 'text-white' : 'text-blue-600'} />
              </div>
              <p className="text-xs font-semibold text-slate-700">{k.nama}</p>
              <p className={`text-xl font-bold mt-0.5 ${kategori === k.nama ? 'text-[#1B4F72]' : 'text-slate-800'}`}>{k.jumlah}</p>
            </button>
          );
        })}
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-4 flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari dokumen..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50"
          value={kategori}
          onChange={e => { setKategori(e.target.value); setPage(1); }}
        >
          <option value="">Semua Kategori</option>
          {dokumenResmiData.kategori.map(k => (
            <option key={k.nama}>{k.nama}</option>
          ))}
        </select>
        <select value={jenis} onChange={(e) => { setJenis(e.target.value); setPage(1); }} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
          <option value="">Semua Jenis</option>
          <option value="PDF">PDF</option>
          <option value="XLSX">XLSX</option>
          <option value="DOCX">DOCX</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50">
          <option value="terbaru">Terbaru Dulu</option>
          <option value="terlama">Terlama Dulu</option>
          <option value="nama">Nama A-Z</option>
          <option value="ukuran">Ukuran Terbesar</option>
        </select>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">
            Daftar Dokumen
            <span className="ml-2 text-slate-400 font-normal">({filtered.length} dokumen)</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">NAMA DOKUMEN</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">KATEGORI</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">JENIS</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">TANGGAL</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">UKURAN</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pageData.map((d) => {
                const Icon = iconMap[d.kategori] || FileText;
                return (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-blue-600" />
                        </div>
                        <span className="font-medium text-slate-800 text-xs">{d.nama}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{d.kategori}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        d.jenis === 'PDF' ? 'bg-red-50 text-red-600' :
                        d.jenis === 'XLSX' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>{d.jenis}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-xs">{d.tanggal}</td>
                    <td className="px-5 py-3 text-slate-500 text-xs">{d.ukuran}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => setPreview(d)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 font-medium transition-colors">
                          <Eye size={12} /> Lihat
                        </button>
                        <button onClick={() => handleDownload(d)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200 font-medium transition-colors">
                          <Download size={12} /> Unduh
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Menampilkan {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} dokumen
          </p>
          {totalPages > 1 && (
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
          )}
        </div>
      </div>

      <Modal open={!!preview} onClose={() => setPreview(null)} title="Pratinjau Dokumen" size="lg">
        {preview && (
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={28} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{preview.nama}</h3>
                <p className="text-sm text-slate-500 mt-1">
                  {preview.kategori} • {preview.jenis} • {preview.ukuran} • {preview.tanggal}
                </p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
              <FileText size={48} className="mx-auto text-slate-300 mb-3" />
              <p className="text-sm text-slate-600 font-medium">Pratinjau dokumen tidak tersedia di mode demo</p>
              <p className="text-xs text-slate-400 mt-1">
                Pada lingkungan produksi, viewer dokumen akan ditampilkan di sini.
              </p>
              <button onClick={() => handleDownload(preview)} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#1B4F72] text-white text-sm rounded-lg hover:bg-[#154060]">
                <Download size={14} /> Unduh dokumen
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
