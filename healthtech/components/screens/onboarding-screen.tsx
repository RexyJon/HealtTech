'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BellRing, Brain, PhoneCall, type LucideIcon } from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { Logo } from '@/components/logo'

type Slide = {
  icon: LucideIcon
  title: string
  text: string
}

const SLIDES: Slide[] = [
  {
    icon: BellRing,
    title: 'Recordatorios de medicación',
    text: 'Te avisamos a la hora exacta de tomar tu medicamento. Solo pulsa "Ya lo tomé".',
  },
  {
    icon: Brain,
    title: 'Mente activa',
    text: 'Ejercita tu memoria con juegos sencillos y divertidos cada día.',
  },
  {
    icon: PhoneCall,
    title: 'Botón de pánico SOS',
    text: 'En una emergencia, un solo botón llama a tu contacto de confianza.',
  },
]

export function OnboardingScreen() {
  const { navigate } = useApp()
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]
  const Icon = slide.icon
  const isLast = index === SLIDES.length - 1

  return (
    <div className="flex h-full flex-col bg-background px-6 py-8">
      <div className="flex items-center justify-between">
        <Logo size={48} />
        <button
          type="button"
          onClick={() => navigate('login')}
          className="rounded-xl px-3 py-2 text-base font-semibold text-muted-foreground"
        >
          Saltar
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="flex h-32 w-32 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon className="size-16" aria-hidden="true" />
            </span>
            <h2 className="text-balance text-3xl font-extrabold text-foreground">
              {slide.title}
            </h2>
            <p className="max-w-xs text-pretty text-lg leading-relaxed text-muted-foreground">
              {slide.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mb-8 flex justify-center gap-3">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-3 rounded-full transition-all ${
              i === index ? 'w-8 bg-primary' : 'w-3 bg-border'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => (isLast ? navigate('login') : setIndex(index + 1))}
        className="w-full rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98]"
      >
        {isLast ? 'Comenzar' : 'Siguiente'}
      </button>
    </div>
  )
}
