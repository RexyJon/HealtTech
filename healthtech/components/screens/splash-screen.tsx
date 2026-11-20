'use client'

import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useApp } from '@/lib/app-context'
import { Logo } from '@/components/logo'

export function SplashScreen() {
  const { navigate } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => navigate('onboarding'), 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-primary px-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Logo size={168} priority />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="text-4xl font-extrabold text-primary-foreground">
          HealthTech
        </h1>
        <p className="mt-2 text-lg text-primary-foreground/80">
          Tu aliado diario en salud.
        </p>
      </motion.div>
    </div>
  )
}
