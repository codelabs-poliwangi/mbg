/**
 * StatCard — persis seperti mockup Pantau MBG:
 * - Teks kiri (label, nilai besar, keterangan perubahan)
 * - Ikon kanan di dalam lingkaran berwarna
 */
export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'bg-blue-100',
  iconTextColor = 'text-blue-600',
  change,
  changePositive = true,
  changeSuffix,
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-start justify-between gap-3">
        {/* Teks kiri */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-slate-500 font-medium leading-snug">{title}</p>
          <p className="text-[26px] font-bold text-slate-800 mt-0.5 leading-none tracking-tight">
            {value}
          </p>
          {change && (
            <div
              className={`flex items-center gap-1 mt-2 text-[12px] font-semibold ${
                changePositive ? 'text-emerald-600' : 'text-red-500'
              }`}
            >
              <span className="text-[10px]">{changePositive ? '▲' : '▼'}</span>
              <span>{change}</span>
            </div>
          )}
          {!change && subtitle && (
            <p className="text-[12px] text-slate-400 mt-1.5">{subtitle}</p>
          )}
        </div>

        {/* Ikon kanan — lingkaran besar */}
        {Icon && (
          <div
            className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center flex-shrink-0`}
          >
            <Icon size={22} className={iconTextColor} strokeWidth={1.8} />
          </div>
        )}
      </div>
    </div>
  );
}
