import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback((toast) => {
    const id = nextId++;
    const item = { id, type: 'info', duration: 4000, ...toast };
    setToasts((t) => [...t, item]);
    if (item.duration > 0) {
      setTimeout(() => remove(id), item.duration);
    }
    return id;
  }, [remove]);

  const toast = {
    success: (msg, opts) => push({ ...opts, type: 'success', message: msg }),
    error: (msg, opts) => push({ ...opts, type: 'error', message: msg }),
    info: (msg, opts) => push({ ...opts, type: 'info', message: msg }),
    warning: (msg, opts) => push({ ...opts, type: 'warning', message: msg }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const icons = {
  success: { Icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-200' },
  error: { Icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 border-red-200' },
  info: { Icon: Info, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200' },
  warning: { Icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 border-amber-200' },
};

function ToastItem({ toast, onClose }) {
  const { Icon, color, bg } = icons[toast.type] || icons.info;
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg shadow-lg border ${bg} animate-in slide-in-from-right`}>
      <Icon size={20} className={`${color} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        {toast.title && <p className="font-semibold text-sm text-slate-800">{toast.title}</p>}
        <p className="text-sm text-slate-700">{toast.message}</p>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
        <X size={16} />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast harus di dalam <ToastProvider>');
  return ctx;
}
