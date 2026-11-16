import { motion, useReducedMotion, type Variants } from 'framer-motion'

/*
 * Drafting marks — small pieces of an architect's drawing vocabulary
 * (north arrow, scale bar, dimension lines, level markers, crop marks,
 * a floor plan, a spirit level) used as decoration across the site, most
 * with a short animation that plays once. The large footer street elevation
 * lives in StreetElevation.tsx.
 *
 * Every mark draws in `currentColor`, so set its colour with a text-* class.
 * Marks that take a `className` for placement are absolutely positioned by
 * the caller (e.g. "absolute left-0 right-0 -bottom-9").
 *
 * Elements animated by Framer Motion must not also carry Tailwind transform
 * classes (translate/rotate/scale): Motion's inline transform replaces them.
 * Offsets on those elements go through `style` (x, y, rotate) instead.
 */

type MarkProps = { className?: string }

const ease = [0.22, 1, 0.36, 1] as const

/* ---------------------------------------------------------------- shared */

/* A stroke that draws itself: `at` is its start time, `dur` its length. */
type Stroke = { d: string; at: number; dur?: number; w?: number }

const drawStroke: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (s: Stroke) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: s.at, duration: s.dur ?? 0.9, ease },
      opacity: { delay: s.at, duration: 0.01 },
    },
  }),
}

const growX = (delay: number): Variants => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { delay, duration: 0.8, ease } },
})

const growY = (delay: number): Variants => ({
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { delay, duration: 0.8, ease } },
})

const popIn = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.3 },
  visible: { opacity: 1, scale: 1, transition: { delay, duration: 0.35, ease } },
})

/* ----------------------------------------------------------- north arrow */

/*
 * North arrow: half-filled needle in a circle. With `settleDelay`, the needle
 * swings in and settles on north like a compass.
 */
export function NorthArrow({ className = '', settleDelay }: MarkProps & { settleDelay?: number }) {
  const swing = settleDelay !== undefined

  return (
    <svg viewBox="0 0 32 44" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <text x="16" y="8" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none" fontFamily="DM Sans, sans-serif">
        N
      </text>
      <circle cx="16" cy="28" r="12" />
      <motion.g
        // pivot on the circle's centre (y = 28) within the needle's 14–36 box
        style={{ originX: 0.5, originY: 14 / 22 }}
        initial={swing ? { rotate: -75 } : false}
        animate={{ rotate: 0 }}
        transition={{ type: 'spring', stiffness: 40, damping: 4, delay: settleDelay }}
      >
        <path d="M16 14 L11 36 L16 32 Z" fill="currentColor" />
        <path d="M16 14 L21 36 L16 32 Z" />
      </motion.g>
    </svg>
  )
}

/* The corner stamp of a drawing sheet: north arrow, scale bar, studio coordinates. */
export function SheetStamp({ className = '', settleDelay }: MarkProps & { settleDelay?: number }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none flex items-center gap-5 ${className}`}>
      <NorthArrow className="w-7 h-10 shrink-0" settleDelay={settleDelay} />
      <span className="self-stretch w-px bg-current opacity-40" />
      <div className="space-y-3">
        <div>
          <div className="flex w-24 h-[5px] border border-current">
            <span className="flex-1 bg-current" />
            <span className="flex-1" />
            <span className="flex-1 bg-current" />
            <span className="flex-1" />
          </div>
          <div className="relative w-24 h-2.5 mt-1.5 text-[9px] leading-none tabular-nums">
            <span className="absolute left-0 -translate-x-1/2">0</span>
            <span className="absolute left-1/2 -translate-x-1/2">5</span>
            <span className="absolute left-full -ml-[5px] whitespace-nowrap">10 m</span>
          </div>
        </div>
        <p className="text-[10px] leading-none tracking-wider tabular-nums whitespace-nowrap">23.02° N, 72.57° E</p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------- dimension line */

/*
 * Dimension line with extension lines and 45° architectural ticks. Draws
 * itself in drafting order when scrolled into view: extension lines, then
 * the dimension line from its centre, then the ticks.
 */
export function DimensionLine({
  vertical = false,
  delay = 0,
  className = '',
}: MarkProps & { vertical?: boolean; delay?: number }) {
  const tick = 'absolute w-3 h-[1.5px] bg-current'
  const reveal = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '0px 0px -40px 0px' } } as const

  if (vertical) {
    return (
      <motion.div aria-hidden="true" {...reveal} className={`pointer-events-none w-4 ${className}`}>
        <motion.span variants={growX(delay)} className="absolute top-0 left-0 right-0 h-px bg-current" />
        <motion.span variants={growX(delay)} className="absolute bottom-0 left-0 right-0 h-px bg-current" />
        <motion.span variants={growY(delay + 0.3)} className="absolute top-0 bottom-0 left-1/2 w-px bg-current" />
        <motion.span variants={popIn(delay + 1)} style={{ x: '-50%', y: '-50%', rotate: -45 }} className={`${tick} top-0 left-1/2`} />
        <motion.span variants={popIn(delay + 1)} style={{ x: '-50%', y: '50%', rotate: -45 }} className={`${tick} bottom-0 left-1/2`} />
      </motion.div>
    )
  }

  return (
    <motion.div aria-hidden="true" {...reveal} className={`pointer-events-none h-4 ${className}`}>
      <motion.span variants={growY(delay)} className="absolute left-0 top-0 bottom-0 w-px bg-current" />
      <motion.span variants={growY(delay)} className="absolute right-0 top-0 bottom-0 w-px bg-current" />
      <motion.span variants={growX(delay + 0.3)} className="absolute left-0 right-0 top-1/2 h-px bg-current" />
      <motion.span variants={popIn(delay + 1)} style={{ x: '-50%', y: '-50%', rotate: -45 }} className={`${tick} left-0 top-1/2`} />
      <motion.span variants={popIn(delay + 1)} style={{ x: '50%', y: '-50%', rotate: -45 }} className={`${tick} right-0 top-1/2`} />
    </motion.div>
  )
}

/* ---------------------------------------------------------- level marker */

/*
 * Level (datum) marker from elevation drawings: quartered circle, two
 * quadrants filled. Inside a parent that animates `hidden` → `visible`
 * variants, it turns a quarter and settles into place.
 */
export function DatumMarker({ className = '', fillClass = 'fill-cream-100' }: MarkProps & { fillClass?: string }) {
  return (
    <motion.svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={className}
      variants={{
        hidden: { rotate: -90, scale: 0.4, opacity: 0 },
        visible: { rotate: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 140, damping: 12, delay: 0.15 } },
      }}
    >
      <circle cx="10" cy="10" r="8" className={fillClass} stroke="currentColor" strokeWidth="1.25" />
      <path d="M10 10 V2 A8 8 0 0 1 18 10 Z M10 10 V18 A8 8 0 0 1 2 10 Z" fill="currentColor" />
      <path d="M10 0 V20 M0 10 H20" stroke="currentColor" strokeWidth="1" />
    </motion.svg>
  )
}

/* ------------------------------------------------------------ crop marks */

/*
 * Print crop marks that close in on hover. Place inside a motion element that
 * uses whileHover="hover"; the marks pick up that variant.
 */
const cropCorners = [
  { pos: 'top-2.5 left-2.5 border-t border-l',     x: -6, y: -6 },
  { pos: 'top-2.5 right-2.5 border-t border-r',    x:  6, y: -6 },
  { pos: 'bottom-2.5 left-2.5 border-b border-l',  x: -6, y:  6 },
  { pos: 'bottom-2.5 right-2.5 border-b border-r', x:  6, y:  6 },
]

export function CropMarks({ className = '' }: MarkProps) {
  return (
    <>
      {cropCorners.map((c) => (
        <motion.span
          key={c.pos}
          aria-hidden="true"
          variants={{ hover: { opacity: 1, x: 0, y: 0 } }}
          initial={{ opacity: 0, x: c.x, y: c.y }}
          transition={{ duration: 0.35, ease }}
          className={`pointer-events-none absolute w-4 h-4 ${c.pos} ${className}`}
        />
      ))}
    </>
  )
}

/* ---------------------------------------------------------- spirit level */

/*
 * A spirit level that starts slightly tilted, then settles level when
 * scrolled into view while its bubble slides back between the marks.
 */
export function SpiritLevel({ className = '' }: MarkProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial="tilted"
      whileInView="level"
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      variants={{
        tilted: { rotate: -4 },
        level: { rotate: 0, transition: { type: 'spring', stiffness: 60, damping: 7, delay: 0.3 } },
      }}
      className={`pointer-events-none relative w-40 h-7 rounded-[3px] border border-current ${className}`}
    >
      <span className="absolute inset-y-1.5 left-3 w-px bg-current opacity-40" />
      <span className="absolute inset-y-1.5 right-3 w-px bg-current opacity-40" />
      {/* vial */}
      <span className="absolute left-1/2 top-1/2 w-16 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current overflow-hidden">
        <span className="absolute inset-y-0 left-[36%] w-px bg-current opacity-60" />
        <span className="absolute inset-y-0 left-[64%] w-px bg-current opacity-60" />
        <motion.span
          variants={{
            tilted: { x: 20 },
            level: { x: 0, transition: { type: 'spring', stiffness: 70, damping: 6, delay: 0.4 } },
          }}
          className="absolute top-1/2 left-1/2 w-4 h-1.5 -mt-[3px] -ml-2 rounded-full bg-current opacity-70"
        />
      </span>
    </motion.div>
  )
}

/* ----------------------------------------------------------- floor plan */

/*
 * A small two-bedroom floor plan that draws itself when scrolled into view —
 * walls, windows, furniture — and finishes with its doors swinging open.
 * Coordinates are in a 240 × 170 viewBox.
 */
const planStrokes: Stroke[] = [
  // exterior walls, with the main-door opening in the bottom wall
  { d: 'M60 160 H10 V10 H230 V160 H90', at: 0, dur: 1.6, w: 3 },
  // interior walls with door openings
  { d: 'M10 80 H60 M84 80 H130 M154 80 H230', at: 0.9, w: 1.75 },
  { d: 'M110 10 V80', at: 1.0, w: 1.75 },
  { d: 'M170 80 V102 M170 132 V160', at: 1.1, w: 1.75 },
  // windows
  { d: 'M30 5 H90 M30 15 H90', at: 1.3, w: 0.75 },
  { d: 'M140 5 H200 M140 15 H200', at: 1.35, w: 0.75 },
  { d: 'M5 100 V140 M15 100 V140', at: 1.4, w: 0.75 },
  { d: 'M225 100 V140 M235 100 V140', at: 1.45, w: 0.75 },
  // beds, sofa, kitchen counter
  { d: 'M20 22 H54 V64 H20 Z M24 26 H50 V34 H24 Z', at: 1.5, w: 1 },
  { d: 'M186 22 H220 V64 H186 Z M190 26 H216 V34 H190 Z', at: 1.55, w: 1 },
  { d: 'M20 96 H32 V144 H20 Z', at: 1.6, w: 1 },
  { d: 'M216 88 V150 H180', at: 1.65, w: 1 },
]

/* Each door: open leaf (drawn from its hinge), its swing arc, and the closed angle it opens from. */
const planDoors = [
  { leaf: 'M60 80 V56',   arc: 'M84 80 A24 24 0 0 0 60 56',   from: 90,  at: 1.9 },
  { leaf: 'M154 80 V56',  arc: 'M130 80 A24 24 0 0 1 154 56', from: -90, at: 2.1 },
  { leaf: 'M60 160 V130', arc: 'M90 160 A30 30 0 0 0 60 130', from: 90,  at: 2.3 },
]

const swingOpen: Variants = {
  hidden: (door: (typeof planDoors)[number]) => ({ rotate: door.from, opacity: 0 }),
  visible: (door: (typeof planDoors)[number]) => ({
    rotate: 0,
    opacity: 1,
    transition: {
      rotate: { delay: door.at + 0.15, duration: 0.9, ease },
      opacity: { delay: door.at, duration: 0.15 },
    },
  }),
}

export function PlanDrawing({ className = '' }: MarkProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 240 170"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    >
      {planStrokes.map((s) => (
        <motion.path key={s.d} d={s.d} strokeWidth={s.w} custom={s} variants={drawStroke} />
      ))}
      {planDoors.map((door) => (
        <g key={door.leaf}>
          <motion.path
            d={door.arc}
            strokeWidth={0.75}
            strokeDasharray="2 3"
            custom={{ d: door.arc, at: door.at + 0.15, dur: 0.9 }}
            variants={drawStroke}
          />
          <motion.path
            d={door.leaf}
            strokeWidth={1.5}
            // hinge is the bottom end of the open leaf
            style={{ originX: 0.5, originY: 1 }}
            custom={door}
            variants={swingOpen}
          />
        </g>
      ))}
    </motion.svg>
  )
}
