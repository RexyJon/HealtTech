'use client'

import { useApp } from '@/lib/app-context'
import { cn } from '@/lib/utils'

export function MiniSos({ className }: { className?: string }) {
  const { navigate } = useApp()

  return (
    <button
      type="button"
      onClick={() => navigate('sos')}
      aria-label="Ir a la pantalla de emergencia SOS"
      className={cn(
        'flex aspect-square h-14 w-14 shrink-0 items-center justify-center rounded-full bg-alert text-alert-foreground text-lg font-extrabold shadow-md ring-4 ring-alert/20 transition-transform active:scale-95',
        className,
      )}
    >
      SOS
    </button>
  )
}
