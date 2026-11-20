'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Screen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'contact'
  | 'home'
  | 'medication'
  | 'cognitive'
  | 'sos'
  | 'history'
  | 'confirmation'

export type TrustedContact = {
  name: string
  phone: string
}

export type ConfirmationInfo = {
  title: string
  message: string
  /** Screen to return to when the user dismisses the confirmation. */
  back: Screen
}

type AppState = {
  screen: Screen
  userName: string
  contact: TrustedContact | null
  confirmation: ConfirmationInfo | null
  navigate: (screen: Screen) => void
  goHome: () => void
  setUserName: (name: string) => void
  setContact: (contact: TrustedContact) => void
  showConfirmation: (info: ConfirmationInfo) => void
  logout: () => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('splash')
  const [userName, setUserNameState] = useState('')
  const [contact, setContactState] = useState<TrustedContact | null>(null)
  const [confirmation, setConfirmation] = useState<ConfirmationInfo | null>(null)

  const navigate = useCallback((next: Screen) => setScreen(next), [])
  const goHome = useCallback(() => setScreen('home'), [])
  const setUserName = useCallback((name: string) => setUserNameState(name), [])
  const setContact = useCallback((c: TrustedContact) => setContactState(c), [])

  const showConfirmation = useCallback((info: ConfirmationInfo) => {
    setConfirmation(info)
    setScreen('confirmation')
  }, [])

  const logout = useCallback(() => {
    setUserNameState('')
    setContactState(null)
    setConfirmation(null)
    setScreen('splash')
  }, [])

  const value = useMemo<AppState>(
    () => ({
      screen,
      userName,
      contact,
      confirmation,
      navigate,
      goHome,
      setUserName,
      setContact,
      showConfirmation,
      logout,
    }),
    [
      screen,
      userName,
      contact,
      confirmation,
      navigate,
      goHome,
      setUserName,
      setContact,
      showConfirmation,
      logout,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
