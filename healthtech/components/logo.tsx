import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  size = 96,
  className,
  priority = false,
}: {
  size?: number
  className?: string
  priority?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded-3xl bg-cream',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Logotipo de HealthTech: un corazón con una línea de latido"
        width={size}
        height={size}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </span>
  )
}
