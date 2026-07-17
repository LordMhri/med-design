import type { ReactNode } from 'react'

export function StatsCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string
  value: string | number
  icon: ReactNode
  accent?: boolean
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          accent ? 'bg-accent/10 text-accent' : 'bg-ink/5 text-ink'
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-body">{label}</p>
        <p className="text-2xl font-bold text-ink">{value}</p>
      </div>
    </div>
  )
}
