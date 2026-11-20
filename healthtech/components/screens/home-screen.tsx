'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  BellRing,
  Brain,
  LineChart,
  LogOut,
  ShieldCheck,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import { useApp, type Screen } from '@/lib/app-context'
import { Logo } from '@/components/logo'

type MenuItem = {
  label: string
  icon: LucideIcon
  target: Screen
  tone: 'primary' | 'alert'
}

const ITEMS: MenuItem[] = [
  { label: 'Alerta de medicación', icon: BellRing, target: 'medication', tone: 'primary' },
  { label: 'Mente activa', icon: Brain, target: 'cognitive', tone: 'primary' },
  { label: 'Pánico SOS', icon: TriangleAlert, target: 'sos', tone: 'alert' },
  { label: 'Historial y reportes', icon: LineChart, target: 'history', tone: 'primary' },
  { label: 'Contacto de confianza', icon: ShieldCheck, target: 'contact', tone: 'primary' },
]

export function HomeScreen() {
  const { navigate, userName, logout } = useApp()
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!exiting) return
    const timer = setTimeout(logout, 2000)
    return () => clearTimeout(timer)
  }, [exiting, logout])

  return (
    <div className="flex h-full flex-col bg-background px-5 py-6">
      <header className="flex items-center gap-3">
        <Logo size={56} />
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Hola,</p>
          <p className="truncate text-2xl font-extrabold text-foreground">
            {userName || 'Bienvenido'}
          </p>
        </div>
      </header>

      <h1 className="mt-6 text-lg font-semibold text-muted-foreground">
        ¿Qué quieres hacer hoy?
      </h1>

      <div className="mt-3 grid grid-cols-2 gap-4">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const alert = item.tone === 'alert'
          return (
            <button
              key={item.target}
              type="button"
              onClick={() => navigate(item.target)}
              className={`flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl p-4 text-center shadow-md transition-transform active:scale-95 ${
                alert
                  ? 'bg-alert text-alert-foreground ring-4 ring-alert/20'
                  : 'bg-card text-foreground'
              }`}
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  alert ? 'bg-alert-foreground/15' : 'bg-primary text-primary-foreground'
                }`}
              >
                <Icon className="size-9" aria-hidden="true" />
              </span>
              <span className="text-base font-bold leading-tight text-balance">
                {item.label}
              </span>
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => setExiting(true)}
          className="flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border-2 border-border bg-transparent p-4 text-center text-foreground transition-transform active:scale-95"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
            <LogOut className="size-9" aria-hidden="true" />
          </span>
          <span className="text-base font-bold leading-tight">Salir</span>
        </button>
      </div>

      <AnimatePresence>
        {exiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-primary px-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Logo size={148} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl font-extrabold text-primary-foreground">
                Hasta pronto
              </p>
              <p className="mt-2 text-lg text-primary-foreground/80">
                Tu aliado diario en salud.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
