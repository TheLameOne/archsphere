// Lucide v1+ renamed some social icons – provide local SVG replacements
import type { SVGProps } from 'react'
import { cn } from '@/lib/utils'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

export function Instagram({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Linkedin({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Twitter({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

// ─── Brand Logo ──────────────────────────────────────────────────────────────

interface LogoProps {
  /** true = cream (dark backgrounds)  |  false = dark (light backgrounds) */
  light?: boolean
  className?: string
}

export function Logo({ light = true, className = '' }: LogoProps) {
  const c = light ? '#EAE3D5' : '#2A1F0E'

  return (
    <div className={cn('flex flex-col items-center select-none', className)}>
      {/* House mark — two overlapping peaked outlines + door */}
      <svg
        viewBox="0 0 94 74"
        fill="none"
        stroke={c}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-11 h-auto"
        aria-hidden="true"
      >
        <polyline points="42,5 14,33 14,70 65,70 65,33 42,5" />
        <polyline points="60,17 40,36 40,70 80,70 80,36 60,17" />
        <rect x="36" y="51" width="15" height="19" />
      </svg>
      <p
        style={{ color: c, letterSpacing: '0.32em' }}
        className="font-sans font-light text-[11px] uppercase mt-[6px] leading-none"
      >
        ARCHSPHERE
      </p>
      <p
        style={{ color: c, letterSpacing: '0.38em', opacity: 0.55 }}
        className="font-sans font-light text-[6.5px] uppercase mt-[4px] leading-none"
      >
        ARCHITECTURE
      </p>
    </div>
  )
}
