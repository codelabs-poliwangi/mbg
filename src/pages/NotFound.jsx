import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center">
      <div className="text-8xl font-black text-slate-100 mb-4">404</div>
      <h1 className="text-2xl font-bold text-slate-700 mb-2">Halaman Tidak Ditemukan</h1>
      <p className="text-slate-500 mb-6">Halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-[#1B4F72] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#154060] transition-colors"
      >
        <Home size={16} />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
