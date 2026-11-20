'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { PhoneCall } from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { ScreenShell } from '@/components/screen-shell'

const HOLD_MS = 2500

export function SosScreen() {
  const { contact, showConfirmation } = useApp()
  const [progress, setProgress] = useState(0)
  const [calling, setCalling] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(0)

  function cancel() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    if (!calling) setProgress(0)
  }

  function tick(now: number) {
    const elapsed = now - startRef.current
    const pct = Math.min(100, (elapsed / HOLD_MS) * 100)
    setProgress(pct)
    if (pct >= 100) {
      setCalling(true)
      return
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  function start() {
    if (calling) return
    startRef.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (!calling) return
    const timer = setTimeout(() => {
      showConfirmation({
        title: 'Contacto avisado',
        message: contact
          ? `Llamando a ${contact.name} (${contact.phone}). Ya recibió tu alerta de emergencia.`
          : 'Llamando a tu contacto de confianza. Ya recibió tu alerta de emergencia.',
        back: 'home',
      })
    }, 1200)
    return () => clearTimeout(timer)
  }, [calling, contact, showConfirmation])

  useEffect(() => () => cancel(), [])

  const size = 240
  const stroke = 12
  const radius = (size - stroke) / 2
  const circ = 2 * Math.PI * radius

  return (
    <ScreenShell title="Pánico SOS" showSos={false}>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-extrabold text-foreground text-balance">
          {calling ? 'Conectando la llamada…' : 'Mantén presionado para pedir ayuda'}
        </h2>
        <p className="mt-2 max-w-xs text-base text-muted-foreground">
          {contact
            ? `Llamaremos a ${contact.name}.`
            : 'Configura un contacto de confianza para las emergencias.'}
        </p>

        <div
          className="relative mt-8 select-none"
          style={{ width: size, height: size }}
        >
          <svg
            className="absolute inset-0 -rotate-90"
            width={size}
            height={size}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--secondary)"
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--alert)"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ - (progress / 100) * circ}
            />
          </svg>
          <motion.button
            type="button"
            onPointerDown={start}
            onPointerUp={cancel}
            onPointerLeave={cancel}
            onContextMenu={(e) => e.preventDefault()}
            animate={calling ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            transition={calling ? { repeat: Infinity, duration: 1 } : undefined}
            style={{ width: size - 32, height: size - 32 }}
            className="absolute left-1/2 top-1/2 flex aspect-square -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full bg-alert text-alert-foreground shadow-xl"
          >
            <span className="text-5xl font-extrabold tracking-wide">SOS</span>
            <span className="flex items-center gap-1 text-sm font-semibold opacity-90">
              <PhoneCall className="size-4" aria-hidden="true" />
              {calling ? 'Llamando' : 'Mantén pulsado'}
            </span>
          </motion.button>
        </div>

        <p className="mt-8 text-base text-muted-foreground">
          {calling
            ? 'No cuelgues, la ayuda está en camino.'
            : 'Suelta antes de tiempo para cancelar.'}
        </p>
      </div>
    </ScreenShell>
  )
}
