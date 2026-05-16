import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, total, pageSize, onChange, label = 'data' }) {
  if (totalPages <= 1) {
    return (
      <div className="p-4 border-t border-slate-100">
        <p className="text-xs text-slate-500">Menampilkan {total} {label}</p>
      </div>
    );
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const pages = [];
  const maxVisible = 5;
  let from = Math.max(1, page - Math.floor(maxVisible / 2));
  let to = Math.min(totalPages, from + maxVisible - 1);
  if (to - from < maxVisible - 1) from = Math.max(1, to - maxVisible + 1);
  for (let i = from; i <= to; i++) pages.push(i);

  return (
    <div className="p-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
      <p className="text-xs text-slate-500">
        Menampilkan <span className="font-medium text-slate-700">{start}–{end}</span> dari{' '}
        <span className="font-medium text-slate-700">{total.toLocaleString('id-ID')}</span> {label}
      </p>
      <div className="flex gap-1 items-center">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
        >
          <ChevronLeft size={14} />
        </button>
        {from > 1 && (
          <>
            <button onClick={() => onChange(1)} className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50">1</button>
            {from > 2 && <span className="text-slate-400 px-1">…</span>}
          </>
        )}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1.5 text-xs border rounded-lg min-w-[32px] ${
              page === p ? 'bg-[#1B4F72] text-white border-[#1B4F72]' : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            {p}
          </button>
        ))}
        {to < totalPages && (
          <>
            {to < totalPages - 1 && <span className="text-slate-400 px-1">…</span>}
            <button onClick={() => onChange(totalPages)} className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-slate-50">{totalPages}</button>
          </>
        )}
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="p-1.5 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
