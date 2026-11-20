'use client'

import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { MiniSos } from '@/components/mini-sos'
import { cn } from '@/lib/utils'

export function ScreenShell({
  title,
  children,
  showSos = true,
  contentClassName,
}: {
  title: string
  children: ReactNode
  showSos?: boolean
  contentClassName?: string
}) {
  const { goHome } = useApp()

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 py-3">
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-base font-bold text-primary-foreground shadow-sm transition-transform active:scale-95"
        >
          <Home className="size-6" aria-hidden="true" />
          Menú
        </button>
        <h1 className="min-w-0 flex-1 truncate text-center text-lg font-bold text-foreground">
          {title}
        </h1>
        {showSos ? (
          <MiniSos className="h-12 w-12 shrink-0 text-base" />
        ) : (
          <span className="w-12 shrink-0" aria-hidden="true" />
        )}
      </header>
      <div className={cn('flex-1 overflow-y-auto p-5', contentClassName)}>
        {children}
      </div>
    </div>
  )
}
