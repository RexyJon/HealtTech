'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Apple,
  Banana,
  Cherry,
  Grape,
  HeartPulse,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { ScreenShell } from '@/components/screen-shell'

const FRUITS: { key: string; icon: LucideIcon; label: string }[] = [
  { key: 'apple', icon: Apple, label: 'manzana' },
  { key: 'banana', icon: Banana, label: 'plátano' },
  { key: 'cherry', icon: Cherry, label: 'cereza' },
  { key: 'grape', icon: Grape, label: 'uva' },
]

type Card = {
  id: number
  key: string
  matched: boolean
}

function buildDeck(): Card[] {
  const deck = FRUITS.flatMap((f, i) => [
    { id: i * 2, key: f.key, matched: false },
    { id: i * 2 + 1, key: f.key, matched: false },
  ])
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export function CognitiveScreen() {
  const { goHome } = useApp()
  const [deck, setDeck] = useState<Card[]>(buildDeck)
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)

  const won = deck.every((c) => c.matched)

  const reset = useCallback(() => {
    setDeck(buildDeck())
    setFlipped([])
    setMoves(0)
    setLocked(false)
  }, [])

  useEffect(() => {
    if (flipped.length !== 2) return
    setLocked(true)
    const [a, b] = flipped
    const match = deck[a].key === deck[b].key
    const timer = setTimeout(() => {
      if (match) {
        setDeck((prev) =>
          prev.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)),
        )
      }
      setFlipped([])
      setLocked(false)
    }, match ? 500 : 900)
    return () => clearTimeout(timer)
  }, [flipped, deck])

  function flip(index: number) {
    if (locked || flipped.includes(index) || deck[index].matched) return
    if (flipped.length === 0) setFlipped([index])
    else {
      setFlipped([flipped[0], index])
      setMoves((m) => m + 1)
    }
  }

  return (
    <ScreenShell title="Mente activa">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-foreground text-balance">
          Encuentra las parejas
        </h2>
        <p className="mt-1 text-base text-muted-foreground">
          Toca las cartas y encuentra las frutas iguales.
        </p>
        <p className="mt-2 inline-block rounded-full bg-secondary px-4 py-1 text-base font-bold text-secondary-foreground">
          Intentos: {moves}
        </p>
      </div>

      <div className="mx-auto mt-5 grid max-w-sm grid-cols-2 gap-4">
        {deck.map((card, index) => {
          const isUp = flipped.includes(index) || card.matched
          const fruit = FRUITS.find((f) => f.key === card.key)!
          const Icon = fruit.icon
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => flip(index)}
              aria-label={isUp ? fruit.label : 'Carta boca abajo'}
              className="relative aspect-square"
            >
              <span
                className={`flex h-full w-full items-center justify-center rounded-3xl shadow-md transition-all duration-200 ${
                  isUp
                    ? 'bg-cream ring-2 ring-primary'
                    : 'bg-primary'
                } ${card.matched ? 'opacity-60' : ''}`}
              >
                {isUp ? (
                  <Icon className="size-14 text-primary" aria-hidden="true" />
                ) : (
                  <HeartPulse
                    className="size-12 text-primary-foreground/80"
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={reset}
        className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-card px-6 py-3 text-lg font-bold text-primary transition-transform active:scale-95"
      >
        <RotateCcw className="size-5" aria-hidden="true" />
        Reiniciar
      </button>

      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-primary/95 px-8 text-center"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <HeartPulse
                className="size-20 text-primary-foreground"
                aria-hidden="true"
              />
            </motion.div>
            <div>
              <p className="text-3xl font-extrabold text-primary-foreground">
                ¡Muy bien!
              </p>
              <p className="mt-1 text-lg text-primary-foreground/80">
                Completaste el ejercicio en {moves} intentos.
              </p>
            </div>
            <div className="flex w-full max-w-xs flex-col gap-3">
              <button
                type="button"
                onClick={reset}
                className="w-full rounded-2xl bg-cream py-4 text-lg font-extrabold text-primary"
              >
                Jugar otra vez
              </button>
              <button
                type="button"
                onClick={goHome}
                className="w-full rounded-2xl border-2 border-primary-foreground/50 py-4 text-lg font-bold text-primary-foreground"
              >
                Volver al menú
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenShell>
  )
}
