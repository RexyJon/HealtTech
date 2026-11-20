'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { MiniSos } from '@/components/mini-sos'

export function ConfirmationScreen() {
  const { confirmation, navigate } = useApp()

  const title = confirmation?.title ?? 'Listo'
  const message = confirmation?.message ?? 'La acción se realizó correctamente.'
  const back = confirmation?.back ?? 'home'

  return (
    <div className="flex h-full flex-col items-center justify-center bg-background px-8 text-center">
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
      >
        <Check className="size-16" strokeWidth={3} aria-hidden="true" />
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-3xl font-extrabold text-foreground text-balance"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 max-w-xs text-lg leading-relaxed text-muted-foreground text-pretty"
      >
        {message}
      </motion.p>

      <button
        type="button"
        onClick={() => navigate(back)}
        className="mt-10 w-full max-w-xs rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98]"
      >
        Volver al menú
      </button>

      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">¿Necesitas ayuda urgente?</span>
        <MiniSos />
      </div>
    </div>
  )
}
