import { useEffect, useRef, useState } from 'react';
import { Bell, AlertTriangle, CheckCircle2, Info, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialNotifs = [
  { id: 1, type: 'warning', title: 'Gap Wilayah Tinggi', message: 'Papua Pegunungan dengan rasio 1:23.5 SPPG/sekolah.', time: '2 jam lalu', link: '/peta-sppg', read: false },
  { id: 2, type: 'error', title: 'Inspeksi Gagal', message: 'SPPG Ternate gagal inspeksi keamanan pangan (skor 58).', time: '5 jam lalu', link: '/keamanan-pangan', read: false },
  { id: 3, type: 'info', title: 'Laporan Warga Baru', message: 'SDN 05 Menteng — Kualitas Makanan.', time: '1 hari lalu', link: '/laporan-warga', read: false },
  { id: 4, type: 'success', title: 'Skor Transparansi Meningkat', message: '78/100 (+6 poin dari bulan lalu).', time: '2 hari lalu', link: '/transparansi-data', read: true },
];

const icons = {
  warning: { Icon: AlertTriangle, color: 'text-amber-500 bg-amber-50' },
  error: { Icon: AlertTriangle, color: 'text-red-500 bg-red-50' },
  info: { Icon: Info, color: 'text-blue-500 bg-blue-50' },
  success: { Icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
};

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifs);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const unread = notifs.filter((n) => !n.read).length;

  const handleClick = (n) => {
    setNotifs((list) => list.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
    setOpen(false);
    if (n.link) navigate(n.link);
  };

  const markAllRead = () => setNotifs((list) => list.map((x) => ({ ...x, read: true })));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
        aria-label="Notifikasi"
      >
        <Bell size={18} className="text-slate-600" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <div>
              <p className="font-semibold text-slate-800 text-sm">Notifikasi</p>
              <p className="text-xs text-slate-500">{unread} belum dibaca</p>
            </div>
            {unread > 0 && (
              <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                Tandai semua dibaca
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifs.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">Belum ada notifikasi.</div>
            ) : (
              notifs.map((n) => {
                const { Icon, color } = icons[n.type] || icons.info;
                return (
                  <button
                    key={n.id}
                    onClick={() => handleClick(n)}
                    className={`w-full flex items-start gap-3 p-3 hover:bg-slate-50 border-b border-slate-50 text-left ${!n.read ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color} flex-shrink-0`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{n.title}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
          <button
            onClick={() => { setOpen(false); navigate('/laporan-warga'); }}
            className="w-full px-4 py-3 text-sm text-[#1B4F72] hover:bg-slate-50 font-medium flex items-center justify-center gap-1 border-t border-slate-100"
          >
            Lihat Semua <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
