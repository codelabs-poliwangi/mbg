import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, FileText, MapPin, Users, MessageSquare, Building2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  sppgData,
  yayasanData,
  laporanWargaData,
  dokumenResmiData,
} from '../data/dummyData';

function buildIndex() {
  const items = [];
  sppgData.daftarSPPG.forEach((s) => items.push({
    type: 'SPPG', label: s.nama, sub: s.wilayah, link: '/peta-sppg', Icon: MapPin,
  }));
  yayasanData.daftarYayasan.forEach((y) => items.push({
    type: 'Yayasan', label: y.nama, sub: `${y.jumlahSPPG} SPPG • ${y.wilayah}`, link: '/yayasan-dan-mitra', Icon: Building2,
  }));
  laporanWargaData.laporan.forEach((l) => items.push({
    type: 'Laporan', label: l.kategori, sub: l.lokasi, link: '/laporan-warga', Icon: MessageSquare,
  }));
  dokumenResmiData.dokumen.forEach((d) => items.push({
    type: 'Dokumen', label: d.nama, sub: `${d.kategori} • ${d.tanggal}`, link: '/dokumen-resmi', Icon: FileText,
  }));
  return items;
}

const pages = [
  { type: 'Halaman', label: 'Beranda', sub: 'Dashboard ringkasan', link: '/', Icon: Users },
  { type: 'Halaman', label: 'Peta SPPG', sub: 'Sebaran SPPG', link: '/peta-sppg', Icon: MapPin },
  { type: 'Halaman', label: 'Penerima Manfaat', sub: 'Data penerima', link: '/penerima-manfaat', Icon: Users },
  { type: 'Halaman', label: 'Penyaluran Dana', sub: 'Realisasi anggaran', link: '/penyaluran-dana', Icon: Users },
  { type: 'Halaman', label: 'Yayasan dan Mitra', sub: 'Kelembagaan', link: '/yayasan-dan-mitra', Icon: Building2 },
  { type: 'Halaman', label: 'Laporan Warga', sub: 'Pengaduan publik', link: '/laporan-warga', Icon: MessageSquare },
  { type: 'Halaman', label: 'Keamanan Pangan', sub: 'Inspeksi mutu', link: '/keamanan-pangan', Icon: Users },
  { type: 'Halaman', label: 'Transparansi Data', sub: 'Skor & dataset', link: '/transparansi-data', Icon: Users },
  { type: 'Halaman', label: 'Ajukan Data PPID', sub: 'Permohonan data', link: '/ajukan-data-ppid', Icon: FileText },
  { type: 'Halaman', label: 'Dokumen Resmi', sub: 'Perpustakaan', link: '/dokumen-resmi', Icon: FileText },
  { type: 'Halaman', label: 'Tentang', sub: 'Tim & kontak', link: '/tentang', Icon: Users },
];

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const index = useMemo(() => [...pages, ...buildIndex()], []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else { setQuery(''); setActiveIdx(0); }
  }, [open]);

  const results = useMemo(() => {
    if (!query) return pages.slice(0, 6);
    const q = query.toLowerCase();
    return index
      .filter((r) => r.label.toLowerCase().includes(q) || r.sub.toLowerCase().includes(q))
      .slice(0, 20);
  }, [query, index]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      const hit = results[activeIdx];
      if (hit) {
        navigate(hit.link);
        setOpen(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex-1 max-w-md flex items-center gap-2 pl-3 pr-2 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <Search size={16} className="text-slate-400" />
        <span className="flex-1 text-left text-slate-400">Cari SPPG, laporan, dokumen…</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-500">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div
            ref={containerRef}
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <Search size={18} className="text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                onKeyDown={onKeyDown}
                placeholder="Cari SPPG, yayasan, laporan, dokumen, halaman…"
                className="flex-1 outline-none text-sm bg-transparent"
              />
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto py-2">
              {results.length === 0 ? (
                <div className="px-4 py-12 text-center text-slate-400 text-sm">
                  Tidak ditemukan hasil untuk "<span className="font-medium">{query}</span>"
                </div>
              ) : (
                results.map((r, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => { navigate(r.link); setOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left ${i === activeIdx ? 'bg-slate-50' : ''}`}
                  >
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <r.Icon size={15} className="text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{r.label}</p>
                      <p className="text-xs text-slate-500 truncate">{r.sub}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-medium uppercase">
                      {r.type}
                    </span>
                  </button>
                ))
              )}
            </div>
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-500 flex items-center gap-3">
              <span><kbd className="px-1 py-0.5 bg-white border rounded">↑↓</kbd> navigasi</span>
              <span><kbd className="px-1 py-0.5 bg-white border rounded">↵</kbd> buka</span>
              <span><kbd className="px-1 py-0.5 bg-white border rounded">ESC</kbd> tutup</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
