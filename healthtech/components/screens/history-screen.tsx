'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Activity, Droplet, Pill } from 'lucide-react'
import { ScreenShell } from '@/components/screen-shell'

const PRESSURE = [
  { day: 'Lun', sis: 128, dia: 82 },
  { day: 'Mar', sis: 132, dia: 85 },
  { day: 'Mié', sis: 125, dia: 80 },
  { day: 'Jue', sis: 130, dia: 83 },
  { day: 'Vie', sis: 122, dia: 79 },
  { day: 'Sáb', sis: 127, dia: 81 },
  { day: 'Dom', sis: 124, dia: 80 },
]

const GLUCOSE = [
  { day: 'Lun', mg: 108 },
  { day: 'Mar', mg: 115 },
  { day: 'Mié', mg: 102 },
  { day: 'Jue', mg: 120 },
  { day: 'Vie', mg: 98 },
  { day: 'Sáb', mg: 110 },
  { day: 'Dom', mg: 105 },
]

export function HistoryScreen() {
  return (
    <ScreenShell title="Historial y reportes">
      <p className="text-base text-muted-foreground">
        Resumen de la última semana para el familiar o cuidador.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat icon={Activity} label="Presión" value="126/81" />
        <Stat icon={Droplet} label="Glucosa" value="108" />
        <Stat icon={Pill} label="Tomas" value="95%" />
      </div>

      <section className="mt-6 rounded-3xl bg-card p-4 shadow-sm">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-foreground">
          <Activity className="size-5 text-primary" aria-hidden="true" />
          Presión arterial
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">mmHg (sistólica / diastólica)</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={PRESSURE} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" tick={{ fontSize: 14, fill: 'var(--muted-foreground)' }} />
            <YAxis tick={{ fontSize: 14, fill: 'var(--muted-foreground)' }} domain={[60, 140]} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--card)',
                fontSize: 14,
              }}
            />
            <Line type="monotone" dataKey="sis" name="Sistólica" stroke="var(--wine)" strokeWidth={4} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="dia" name="Diastólica" stroke="var(--alert)" strokeWidth={4} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="mt-5 rounded-3xl bg-card p-4 shadow-sm">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-foreground">
          <Droplet className="size-5 text-primary" aria-hidden="true" />
          Glucosa
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">mg/dL en ayunas</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={GLUCOSE} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" tick={{ fontSize: 14, fill: 'var(--muted-foreground)' }} />
            <YAxis tick={{ fontSize: 14, fill: 'var(--muted-foreground)' }} domain={[80, 140]} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--card)',
                fontSize: 14,
              }}
            />
            <Line type="monotone" dataKey="mg" name="Glucosa" stroke="var(--wine)" strokeWidth={4} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </ScreenShell>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Activity
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-primary p-3 text-primary-foreground">
      <Icon className="size-6" aria-hidden="true" />
      <span className="text-xl font-extrabold">{value}</span>
      <span className="text-xs opacity-80">{label}</span>
    </div>
  )
}
