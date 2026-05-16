import { NavLink } from 'react-router-dom';
import {
  Home,
  Map,
  Users,
  DollarSign,
  Building2,
  MessageSquare,
  ShieldCheck,
  Database,
  FileQuestion,
  FileText,
  Info,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Beranda', icon: Home },
  { path: '/peta-sppg', label: 'Peta SPPG', icon: Map },
  { path: '/penerima-manfaat', label: 'Penerima Manfaat', icon: Users },
  { path: '/penyaluran-dana', label: 'Penyaluran Dana', icon: DollarSign },
  { path: '/yayasan-dan-mitra', label: 'Yayasan dan Mitra', icon: Building2 },
  { path: '/laporan-warga', label: 'Laporan Warga', icon: MessageSquare },
  { path: '/keamanan-pangan', label: 'Keamanan Pangan', icon: ShieldCheck },
  { path: '/transparansi-data', label: 'Transparansi Data', icon: Database },
  { path: '/ajukan-data-ppid', label: 'Ajukan Data PPID', icon: FileQuestion },
  { path: '/dokumen-resmi', label: 'Dokumen Resmi', icon: FileText },
  { path: '/tentang', label: 'Tentang Pantau MBG', icon: Info },
];

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-[#1B4F72] flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-[#1B4F72] font-bold text-lg">M</span>
          </div>
          <div>
            <div className="text-white font-bold text-base leading-tight">Pantau MBG</div>
            <div className="text-blue-200 text-xs leading-tight">Program Makan Bergizi Gratis</div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto sidebar-scrollbar py-3">
        <div className="px-3 mb-2">
          <p className="text-blue-300 text-xs font-medium uppercase tracking-wider px-2 mb-1">Menu Utama</p>
        </div>
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-150 group ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'} />
                <span className="text-sm font-medium flex-1">{label}</span>
                {isActive && <ChevronRight size={14} className="text-blue-200" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-blue-300 text-xs">Perbarui data terakhir</p>
        <p className="text-white text-xs font-medium">21 Mei 2025, 09:30 WIB</p>
      </div>
    </div>
  );
}
