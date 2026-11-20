import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary p-0 sm:p-6">
      <div className="relative h-screen w-full max-w-[393px] overflow-hidden bg-background shadow-2xl sm:h-[852px] sm:max-h-[94vh] sm:w-[393px] sm:rounded-[3.25rem] sm:border-[10px] sm:border-primary">
        <div className="h-full w-full overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
