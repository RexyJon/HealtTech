'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { PhoneCall, ShieldCheck } from 'lucide-react'
import { useApp } from '@/lib/app-context'

export function TrustedContactScreen() {
  const { navigate, setContact } = useApp()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [tested, setTested] = useState(false)

  const ready = name.trim().length >= 2 && phone.replace(/\D/g, '').length >= 7

  function save() {
    if (!ready) return
    setContact({ name: name.trim(), phone: phone.trim() })
    navigate('home')
  }

  return (
    <div className="flex h-full flex-col bg-background px-6 py-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ShieldCheck className="size-10" aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-extrabold text-foreground">
          Contacto de confianza
        </h1>
        <p className="max-w-xs text-base text-muted-foreground">
          Esta persona recibirá tus llamadas de emergencia SOS.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <label className="block text-base font-semibold text-foreground">
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Ana (mi hija)"
            className="mt-2 w-full rounded-2xl border-2 border-input bg-card px-4 py-4 text-xl text-foreground outline-none focus:border-primary"
          />
        </label>
        <label className="block text-base font-semibold text-foreground">
          Teléfono
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              setTested(false)
            }}
            placeholder="Ej. 555 123 4567"
            className="mt-2 w-full rounded-2xl border-2 border-input bg-card px-4 py-4 text-xl text-foreground outline-none focus:border-primary"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => ready && setTested(true)}
        disabled={!ready}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-card py-4 text-lg font-bold text-primary transition-transform active:scale-[0.98] disabled:opacity-40"
      >
        <PhoneCall className="size-6" aria-hidden="true" />
        Probar llamada
      </button>

      {tested && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-xl bg-secondary px-4 py-3 text-center text-base font-semibold text-secondary-foreground"
        >
          Llamada de prueba realizada correctamente.
        </motion.p>
      )}

      <div className="flex-1" />

      <button
        type="button"
        onClick={save}
        disabled={!ready}
        className="w-full rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98] disabled:opacity-40"
      >
        Guardar y continuar
      </button>
    </div>
  )
}
