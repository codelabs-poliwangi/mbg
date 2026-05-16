import { useEffect, useRef, useState } from 'react';
import { ChevronDown, User, Settings, LogOut, Shield, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const menu = [
    { Icon: User, label: 'Profil Saya', action: () => toast.info('Halaman profil belum tersedia di demo.') },
    { Icon: Settings, label: 'Pengaturan', action: () => toast.info('Pengaturan belum tersedia di demo.') },
    { Icon: Shield, label: 'Keamanan Akun', action: () => toast.info('Keamanan akun belum tersedia di demo.') },
    { Icon: HelpCircle, label: 'Bantuan', action: () => navigate('/tentang') },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 hover:bg-slate-50 rounded-lg pl-3 pr-2 py-1.5 transition-colors"
      >
        <div className="w-8 h-8 bg-[#1B4F72] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">A</span>
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-slate-800 leading-tight">Andi Pratama</p>
          <p className="text-xs text-slate-500 leading-tight">Admin Publik</p>
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
          <div className="p-4 border-b border-slate-100 bg-gradient-to-br from-[#1B4F72] to-[#2874A6] text-white">
            <p className="font-semibold">Andi Pratama</p>
            <p className="text-xs text-blue-100">andi.pratama@pantau.mbg.go.id</p>
            <span className="inline-block mt-2 px-2 py-0.5 bg-white/20 rounded text-[10px] font-medium uppercase tracking-wide">
              Admin Publik
            </span>
          </div>
          <div className="py-1">
            {menu.map(({ Icon, label, action }) => (
              <button
                key={label}
                onClick={() => { action(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Icon size={16} className="text-slate-400" />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-slate-100 py-1">
            <button
              onClick={() => { setOpen(false); toast.success('Anda telah keluar dari sesi demo.'); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
