import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import SearchPalette from './SearchPalette';
import NotificationDropdown from './NotificationDropdown';
import UserMenu from './UserMenu';
import { provinsiList } from '../data/wilayah';

export default function Header() {
  const [wilayah, setWilayah] = useState('Seluruh Indonesia');

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-white border-b border-slate-200 flex items-center px-5 z-30 gap-3">
      <SearchPalette />

      {/* Wilayah selector dengan label */}
      <div className="flex items-center gap-2 border border-slate-200 rounded-lg bg-slate-50 px-3 h-9">
        <span className="text-xs text-slate-500 font-medium whitespace-nowrap hidden md:block">Wilayah:</span>
        <MapPin size={13} className="text-slate-400 flex-shrink-0" />
        <select
          value={wilayah}
          onChange={(e) => setWilayah(e.target.value)}
          className="appearance-none bg-transparent text-sm text-slate-700 font-medium pr-5 focus:outline-none cursor-pointer max-w-[170px]"
          style={{ backgroundImage: 'none' }}
        >
          <option value="Seluruh Indonesia">Seluruh Indonesia</option>
          {provinsiList.map((p) => (
            <option key={p.kode} value={p.nama}>{p.nama}</option>
          ))}
        </select>
        <ChevronDown size={13} className="text-slate-400 flex-shrink-0 -ml-3 pointer-events-none" />
      </div>

      <NotificationDropdown />
      <div className="border-l border-slate-200 h-7" />
      <UserMenu />
    </header>
  );
}
