import { NavLink } from 'react-router-dom';
import {
  Home, Map, Users, DollarSign, Building2, MessageSquare,
  ShieldCheck, Database, FileQuestion, FileText, Info, ChevronRight,
  Calendar,
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

function MBGLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="white" />
      {/* Outer ring */}
      <circle cx="20" cy="20" r="17" fill="none" stroke="#1B4F72" strokeWidth="1.5" />
      {/* Bowl / plate */}
      <path d="M11 22 Q11 28 20 28 Q29 28 29 22" stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="11" y1="22" x2="29" y2="22" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" />
      {/* Left person */}
      <circle cx="13.5" cy="14" r="2.5" fill="#1B4F72" />
      <path d="M10 21 Q10 17 13.5 17 Q16 17 16.5 19" stroke="#1B4F72" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Middle person */}
      <circle cx="20" cy="13" r="2.8" fill="#16A085" />
      <path d="M16 21 Q16 16.5 20 16.5 Q24 16.5 24 21" stroke="#16A085" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Right person */}
      <circle cx="26.5" cy="14" r="2.5" fill="#1B4F72" />
      <path d="M23.5 19 Q24 17 26.5 17 Q30 17 30 21" stroke="#1B4F72" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-[#1B4F72] flex flex-col z-40">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <MBGLogo />
          </div>
          <div className="min-w-0">
            <div className="text-white font-bold text-[15px] leading-snug">Pantau MBG</div>
            <div className="text-blue-200 text-[11px] leading-snug">Program Makan Bergizi Gratis</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scrollbar py-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-100 group ${
                isActive
                  ? 'bg-white text-[#1B4F72]'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={17}
                  className={isActive ? 'text-[#1B4F72]' : 'text-blue-300 group-hover:text-white'}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span className={`text-sm flex-1 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {label}
                </span>
                {isActive && <ChevronRight size={14} className="text-[#1B4F72]/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-blue-200">
          <Calendar size={13} />
          <div>
            <p className="text-[11px] font-medium">Perbarui data terakhir</p>
            <p className="text-white text-[11px] font-semibold">21 Mei 2025, 09:30 WIB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
