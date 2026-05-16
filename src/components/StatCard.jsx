export default function StatCard({ title, value, subtitle, icon: Icon, iconColor = 'bg-blue-100', iconTextColor = 'text-blue-600', change, changePositive = true }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          {change && (
            <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${changePositive ? 'text-emerald-600' : 'text-red-500'}`}>
              <span>{changePositive ? '▲' : '▼'} {change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon size={20} className={iconTextColor} />
          </div>
        )}
      </div>
    </div>
  );
}
