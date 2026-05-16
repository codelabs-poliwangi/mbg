import { useState } from 'react';
import { Search, Bell, ChevronDown, User } from 'lucide-react';

export default function Header() {
  const [wilayah, setWilayah] = useState('Nasional');

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-white border-b border-slate-200 flex items-center px-6 z-30 gap-4">
      {/* Search */}
      <div className="flex-1 relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari SPPG, laporan, dokumen..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Wilayah Dropdown */}
      <div className="relative">
        <select
          value={wilayah}
          onChange={(e) => setWilayah(e.target.value)}
          className="appearance-none pl-3 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option>Nasional</option>
          <option>DKI Jakarta</option>
          <option>Jawa Barat</option>
          <option>Jawa Tengah</option>
          <option>Jawa Timur</option>
          <option>Sumatera Utara</option>
          <option>Sulawesi Selatan</option>
          <option>NTT</option>
          <option>Papua</option>
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      {/* Notifications */}
      <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
        <Bell size={18} className="text-slate-600" />
        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
      </button>

      {/* User */}
      <div className="flex items-center gap-2.5 border-l border-slate-200 pl-4">
        <div className="w-8 h-8 bg-[#1B4F72] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">A</span>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-slate-800 leading-tight">Andi Pratama</p>
          <p className="text-xs text-slate-500 leading-tight">Admin Publik</p>
        </div>
        <ChevronDown size={14} className="text-slate-400" />
      </div>
    </header>
  );
}
