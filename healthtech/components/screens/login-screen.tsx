'use client'

import { useState } from 'react'
import { Delete, Fingerprint } from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { Logo } from '@/components/logo'

export function LoginScreen() {
  const { navigate, setUserName } = useApp()
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')

  const nameReady = name.trim().length >= 2
  const pinReady = pin.length === 4

  function addDigit(d: string) {
    if (pin.length < 4) setPin(pin + d)
  }

  function submit() {
    if (!nameReady || !pinReady) return
    setUserName(name.trim())
    navigate('contact')
  }

  return (
    <div className="flex h-full flex-col bg-background px-6 py-8">
      <div className="flex flex-col items-center gap-3">
        <Logo size={72} />
        <h1 className="text-2xl font-extrabold text-foreground">Bienvenido</h1>
        <p className="text-center text-base text-muted-foreground">
          Ingresa tu nombre y un PIN de 4 dígitos para entrar.
        </p>
      </div>

      <label className="mt-6 block text-base font-semibold text-foreground">
        Tu nombre
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. María"
          autoComplete="given-name"
          className="mt-2 w-full rounded-2xl border-2 border-input bg-card px-4 py-4 text-xl text-foreground outline-none focus:border-primary"
        />
      </label>

      <div className="mt-6 flex flex-col items-center">
        <span className="text-base font-semibold text-foreground">Tu PIN</span>
        <div className="mt-3 flex gap-4">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-5 w-5 rounded-full border-2 border-primary ${
                i < pin.length ? 'bg-primary' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-5 grid w-full max-w-xs grid-cols-3 gap-3">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => addDigit(d)}
            className="rounded-2xl bg-secondary py-4 text-2xl font-bold text-secondary-foreground transition-transform active:scale-95"
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          aria-label="Usar biometría"
          onClick={submit}
          disabled={!nameReady}
          className="flex items-center justify-center rounded-2xl bg-secondary py-4 text-secondary-foreground transition-transform active:scale-95 disabled:opacity-40"
        >
          <Fingerprint className="size-7" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => addDigit('0')}
          className="rounded-2xl bg-secondary py-4 text-2xl font-bold text-secondary-foreground transition-transform active:scale-95"
        >
          0
        </button>
        <button
          type="button"
          aria-label="Borrar último dígito"
          onClick={() => setPin(pin.slice(0, -1))}
          className="flex items-center justify-center rounded-2xl bg-secondary py-4 text-secondary-foreground transition-transform active:scale-95"
        >
          <Delete className="size-7" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={!nameReady || !pinReady}
        className="mt-6 w-full rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98] disabled:opacity-40"
      >
        Entrar
      </button>
    </div>
  )
}
