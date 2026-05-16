import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import SearchPalette from './SearchPalette';
import NotificationDropdown from './NotificationDropdown';
import UserMenu from './UserMenu';
import { provinsiList } from '../data/wilayah';

export default function Header() {
  const [wilayah, setWilayah] = useState('Nasional');

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-white border-b border-slate-200 flex items-center px-6 z-30 gap-4">
      <SearchPalette />

      <div className="relative">
        <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <select
          value={wilayah}
          onChange={(e) => setWilayah(e.target.value)}
          className="appearance-none pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer max-w-[200px]"
        >
          <option>Nasional</option>
          {provinsiList.map((p) => (
            <option key={p.kode} value={p.nama}>{p.nama}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      <NotificationDropdown />
      <div className="border-l border-slate-200 h-8" />
      <UserMenu />
    </header>
  );
}
