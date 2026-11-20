'use client'

import { AnimatePresence, motion } from 'motion/react'
import { AppProvider, useApp } from '@/lib/app-context'
import { PhoneFrame } from '@/components/phone-frame'
import { SplashScreen } from '@/components/screens/splash-screen'
import { OnboardingScreen } from '@/components/screens/onboarding-screen'
import { LoginScreen } from '@/components/screens/login-screen'
import { TrustedContactScreen } from '@/components/screens/trusted-contact-screen'
import { HomeScreen } from '@/components/screens/home-screen'
import { MedicationScreen } from '@/components/screens/medication-screen'
import { CognitiveScreen } from '@/components/screens/cognitive-screen'
import { SosScreen } from '@/components/screens/sos-screen'
import { HistoryScreen } from '@/components/screens/history-screen'
import { ConfirmationScreen } from '@/components/screens/confirmation-screen'

const SCREENS = {
  splash: SplashScreen,
  onboarding: OnboardingScreen,
  login: LoginScreen,
  contact: TrustedContactScreen,
  home: HomeScreen,
  medication: MedicationScreen,
  cognitive: CognitiveScreen,
  sos: SosScreen,
  history: HistoryScreen,
  confirmation: ConfirmationScreen,
} as const

function Router() {
  const { screen } = useApp()
  const Active = SCREENS[screen]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="h-full w-full"
      >
        <Active />
      </motion.div>
    </AnimatePresence>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <PhoneFrame>
        <Router />
      </PhoneFrame>
    </AppProvider>
  )
}
