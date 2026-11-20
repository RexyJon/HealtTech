'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { BellRing, Clock, Pill } from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { ScreenShell } from '@/components/screen-shell'

const SCHEDULE = [
  { name: 'Losartán 50 mg', time: '8:00 AM', note: '1 pastilla con el desayuno', due: true },
  { name: 'Metformina 850 mg', time: '2:00 PM', note: '1 pastilla con la comida', due: false },
  { name: 'Atorvastatina 20 mg', time: '9:00 PM', note: '1 pastilla antes de dormir', due: false },
]

export function MedicationScreen() {
  const { showConfirmation } = useApp()
  const [snoozed, setSnoozed] = useState(false)
  const current = SCHEDULE[0]

  function taken() {
    showConfirmation({
      title: 'Toma registrada',
      message: `Registramos tu ${current.name}. Avisamos a tu contacto de confianza.`,
      back: 'home',
    })
  }

  return (
    <ScreenShell title="Alerta de medicación">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/15">
            <BellRing className="size-8" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm text-primary-foreground/80">Ahora, {current.time}</p>
            <p className="text-2xl font-extrabold leading-tight text-balance">
              Es hora de tu medicamento
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-primary-foreground/10 p-4">
          <p className="text-xl font-bold">{current.name}</p>
          <p className="text-primary-foreground/80">{current.note}</p>
        </div>

        <button
          type="button"
          onClick={taken}
          className="mt-5 w-full rounded-2xl bg-cream py-5 text-xl font-extrabold text-primary shadow-sm transition-transform active:scale-[0.98]"
        >
          Ya lo tomé
        </button>
        <button
          type="button"
          onClick={() => setSnoozed(true)}
          className="mt-3 w-full rounded-2xl border-2 border-primary-foreground/40 py-4 text-lg font-bold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Recordar en 10 mins
        </button>

        {snoozed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-primary-foreground/90"
          >
            <Clock className="size-4" aria-hidden="true" />
            Te avisaremos de nuevo en 10 minutos.
          </motion.p>
        )}
      </motion.div>

      <h2 className="mt-7 mb-3 text-lg font-bold text-foreground">
        Tomas de hoy
      </h2>
      <ul className="flex flex-col gap-3">
        {SCHEDULE.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-3 rounded-2xl bg-card p-4"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
              <Pill className="size-6" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold text-foreground">
                {item.name}
              </p>
              <p className="text-sm text-muted-foreground">{item.note}</p>
            </div>
            <span className="shrink-0 text-base font-bold text-primary">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </ScreenShell>
  )
}
