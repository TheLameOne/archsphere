import { motion, useReducedMotion, type Variants } from 'framer-motion'

/*
 * Footer elevation — a line drawing that builds itself like a construction
 * sequence, about twelve seconds from first line to last light, once it
 * scrolls into view. Two compositions share one timeline:
 *
 *   layout="wide"  the full street (2000 × 320) for tablets and up
 *   layout="tall"  one three-storey house (400 × 540) for phones
 *
 *   0–2s     survey: ground line, earth hatch, column grid
 *   1–3s     a tower crane goes up; dashed footings appear below ground
 *   2.4–5.5s structure: columns rise, plinth, slabs, parapet, stair tower
 *   5.2–8s   openings: entrance, glazing, windows, sunshades, railing, jaali, fins
 *   7–9.5s   terrace (pergola, solar panels, plants); on the wide street also
 *            the neighbours, gate and car
 *   9.2s     the crane is taken down
 *   9.4–11s  landscape: trees, lamps, plants, moon, birds
 *   10–12s   lights come on in the windows and lamps
 *
 * Ground is y = 270 (wide) or y = 470 (tall); below it sit the footings and
 * grid bubbles. Line work draws in currentColor.
 */

const ease = [0.22, 1, 0.36, 1] as const
const LIGHT = '#F2C47E'

/* ------------------------------------------------------------- engine */

/*
 * One stroke of the drawing. `at` is when it starts, `dur` how long it takes.
 * Dashed lines can't be drawn on with pathLength, so they `grow` (upward)
 * or `fade` in instead.
 */
type Piece = {
  d: string
  at: number
  dur?: number
  w?: number
  dash?: string
  mode?: 'draw' | 'grow' | 'fade'
  fill?: boolean
}

type Label = { x: number; y: number; text: string; at: number; anchor: 'start' | 'middle' }
type Light = { x: number; y: number; w: number; h: number; at: number; o?: number }
type Glow = { cx: number; cy: number; r: number; at: number }

type Scene = {
  viewBox: string
  annotations: Piece[]
  labels: Label[]
  crane: Piece[]
  background: Piece[]
  main: Piece[]
  landscape: Piece[]
  birds: Piece[]
  lights: Light[]
  glows: Glow[]
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (p: Piece) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: p.at, duration: p.dur ?? 0.8, ease },
      opacity: { delay: p.at, duration: 0.01 },
    },
  }),
}

const grow: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (p: Piece) => ({ scaleY: 1, opacity: 1, transition: { delay: p.at, duration: p.dur ?? 0.9, ease } }),
}

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (p: { at: number; dur?: number }) => ({ opacity: 1, transition: { delay: p.at, duration: p.dur ?? 0.5 } }),
}

const modes = { draw, grow, fade }

const craneLeaves: Variants = {
  hidden: { opacity: 0.75 },
  visible: { opacity: 0, transition: { delay: 9.2, duration: 1.4, ease: 'easeInOut' } },
}

const birdsDrift: Variants = {
  hidden: { x: 0 },
  visible: { x: 50, transition: { delay: 10.4, duration: 10, ease: 'linear' } },
}

const lightUp: Variants = {
  hidden: { opacity: 0 },
  visible: (l: Light) => ({ opacity: l.o ?? 0.24, transition: { delay: l.at, duration: 0.7, ease: 'easeOut' } }),
}

const glowOn: Variants = {
  hidden: { opacity: 0 },
  visible: (at: number) => ({ opacity: 1, transition: { delay: at, duration: 1, ease: 'easeOut' } }),
}

function Pieces({ items }: { items: Piece[] }) {
  return (
    <>
      {items.map((p, i) => {
        const mode = p.mode ?? 'draw'
        return (
          <motion.path
            key={i}
            d={p.d}
            strokeWidth={p.w}
            strokeDasharray={p.dash}
            fill={p.fill ? 'currentColor' : undefined}
            stroke={p.fill ? 'none' : undefined}
            style={mode === 'grow' ? { originY: 1 } : undefined}
            custom={p}
            variants={modes[mode]}
          />
        )
      })}
    </>
  )
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i)
const rect = (x: number, y: number, w: number, h: number) => `M${x} ${y} H${x + w} V${y + h} H${x} Z`
const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`

/* A pot with three leafy stems, standing on the ground at `ground`. */
const plant = (x: number, ground: number) =>
  `M${x - 8} ${ground} L${x - 6} ${ground - 12} H${x + 6} L${x + 8} ${ground} ` +
  `M${x} ${ground - 12} C${x - 6} ${ground - 22} ${x - 2} ${ground - 30} ${x} ${ground - 34} ` +
  `M${x} ${ground - 12} C${x + 6} ${ground - 22} ${x + 8} ${ground - 28} ${x + 12} ${ground - 30} ` +
  `M${x} ${ground - 12} C${x - 2} ${ground - 20} ${x - 10} ${ground - 24} ${x - 12} ${ground - 26}`

/* Grid lines, bubbles and letters for a row of columns, bubbles below ground. */
function gridAnnotations(xs: { x: number; label: string }[], ground: number, top: number) {
  const bubbleY = ground + 36
  const pieces: Piece[] = [
    ...xs.map((g, i): Piece => ({ d: `M${g.x} ${bubbleY - 9} V${top}`, at: 0.4 + i * 0.12, dur: 1, w: 0.8, dash: '6 5', mode: 'grow' })),
    ...xs.map((g, i): Piece => ({ d: circle(g.x, bubbleY, 9), at: 0.5 + i * 0.12, dur: 0.5, w: 1 })),
  ]
  const labels: Label[] = xs.map((g, i) => ({ x: g.x, y: bubbleY + 3.5, text: g.label, at: 0.9 + i * 0.12, anchor: 'middle' }))
  return { pieces, labels }
}

/* Dashed footing: column stub below ground and a pad. */
const footing = (x: number, ground: number, at: number): Piece => ({
  d: `M${x - 5} ${ground} V${ground + 14} M${x + 5} ${ground} V${ground + 14} ${rect(x - 18, ground + 14, 36, 8)}`,
  at,
  w: 1,
  dash: '3 3',
  mode: 'fade',
})

const earthHatch = (from: number, count: number, ground: number): Piece => ({
  d: range(count).map((i) => `M${from + i * 14} ${ground} l-8 8`).join(' '),
  at: 0.9,
  dur: 1.8,
  w: 1,
})

/* ========================================================== wide street */

const WIDE_GRID = [
  { x: 720, label: 'A' },
  { x: 860, label: 'B' },
  { x: 1000, label: 'C' },
  { x: 1140, label: 'D' },
  { x: 1280, label: 'E' },
]

const WIDE_LEVELS = [
  { y: 270, label: '±0.00' },
  { y: 160, label: '+3.30' },
  { y: 62, label: '+6.30' },
]

const wideGrid = gridAnnotations(WIDE_GRID, 270, 56)

const wideScene: Scene = {
  viewBox: '0 0 2000 320',

  annotations: [
    earthHatch(-40, 150, 270),
    ...wideGrid.pieces,
    ...[...WIDE_GRID.map((g) => g.x), 672, 1394].map((x, i) => footing(x, 270, 1.8 + i * 0.08)),
    // level markers: leader, quartered circle, filled quadrants
    ...WIDE_LEVELS.flatMap((l, i): Piece[] => [
      ...(l.y === 270 ? [] : [{ d: `M1418 ${l.y} H1440`, at: 4.8 + i * 0.2, w: 0.8, dash: '3 3', mode: 'fade' as const }]),
      { d: circle(1446, l.y, 5), at: 4.9 + i * 0.2, dur: 0.4, w: 1 },
      {
        d: `M1446 ${l.y} V${l.y - 5} A5 5 0 0 1 1451 ${l.y} Z M1446 ${l.y} V${l.y + 5} A5 5 0 0 1 1441 ${l.y} Z`,
        at: 5.1 + i * 0.2,
        mode: 'fade',
        fill: true,
      },
    ]),
  ],

  labels: [
    ...wideGrid.labels,
    ...WIDE_LEVELS.map((l, i): Label => ({ x: 1456, y: l.y + 3.5, text: l.label, at: 5.2 + i * 0.2, anchor: 'start' })),
  ],

  crane: [
    { d: 'M1490 270 V262 H1526 V270', at: 1.0, dur: 0.4 },
    { d: 'M1500 270 V8 M1516 270 V8', at: 1.1, dur: 1.2 },
    { d: 'M1500 270 ' + range(18).map((i) => `L${i % 2 === 0 ? 1516 : 1500} ${256 - i * 14}`).join(' '), at: 1.5, dur: 1.4, w: 0.8 },
    { d: 'M1150 14 H1600 M1150 22 H1600', at: 2.0, dur: 1.0 },
    { d: 'M1500 22 ' + range(25).map((i) => `L${1486 - i * 14} ${i % 2 === 0 ? 14 : 22}`).join(' '), at: 2.3, dur: 1.0, w: 0.8 },
    { d: 'M1516 22 L1530 14 L1544 22 L1558 14 L1572 22 L1586 14 L1600 22', at: 2.4, dur: 0.6, w: 0.8 },
    { d: 'M1500 8 L1508 -6 L1516 8 M1508 -6 L1160 14 M1508 -6 L1596 14', at: 2.6, dur: 0.8, w: 0.8 },
    { d: rect(1570, 22, 26, 16), at: 2.8, dur: 0.4 },
    { d: rect(1516, 22, 16, 13), at: 2.9, dur: 0.4 },
    { d: `${rect(1160, 22, 12, 4)} M1166 26 V38 M1166 38 q0 6 -5 6`, at: 3.0, dur: 0.6, w: 1 },
  ],

  // neighbours, in lighter line weight as on a real elevation
  background: [
    // left house
    { d: 'M270 270 V118 H490 V270', at: 7.0, dur: 1.2, w: 1.4 },
    { d: rect(266, 110, 228, 8), at: 7.6, dur: 0.6, w: 1.2 },
    { d: 'M270 194 H490', at: 7.7, dur: 0.5, w: 1 },
    { d: `${rect(290, 206, 60, 44)} M320 206 V250`, at: 7.9, dur: 0.6, w: 1 },
    { d: 'M400 270 V204 H440 V270', at: 8.0, dur: 0.6, w: 1 },
    { d: `${rect(290, 134, 60, 42)} M320 134 V176 ${rect(400, 134, 60, 42)} M430 134 V176`, at: 8.1, dur: 0.8, w: 1 },
    { d: 'M284 128 H356 M394 128 H466 M284 200 H356', at: 8.3, dur: 0.5, w: 1 },
    { d: 'M440 110 V96 H470 V110', at: 8.4, dur: 0.4, w: 1 },
    { d: `${rect(456, 212, 22, 16)} ${circle(467, 220, 5)}`, at: 8.5, dur: 0.5, w: 0.9 },
    // apartment block: shell, parapet, floor lines
    { d: 'M1550 270 V50 H1790 V270', at: 7.2, dur: 1.4, w: 1.4 },
    { d: rect(1546, 44, 248, 6), at: 7.9, dur: 0.6, w: 1.2 },
    { d: 'M1550 105 H1790 M1550 160 H1790 M1550 215 H1790', at: 7.9, dur: 0.8, w: 0.9 },
    // per floor, bottom up: two windows, then a balcony (or the entrance at ground level)
    ...[
      { top: 50, bottom: 105 },
      { top: 105, bottom: 160 },
      { top: 160, bottom: 215 },
      { top: 215, bottom: 270 },
    ].flatMap((f, i): Piece[] => {
      const at = 8.1 + (3 - i) * 0.2
      const windows =
        `${rect(1566, f.top + 14, 50, 26)} M1591 ${f.top + 14} V${f.top + 40} ` +
        `${rect(1724, f.top + 14, 50, 26)} M1749 ${f.top + 14} V${f.top + 40}`
      const middle =
        f.bottom === 270
          ? `M1652 270 V${f.top + 16} H1688 V270 M1670 ${f.top + 16} V270 M1640 ${f.top + 12} H1700`
          : `M1652 ${f.bottom} V${f.top + 8} H1688 V${f.bottom} ` +
            `M1638 ${f.bottom - 16} H1702 M1638 ${f.bottom - 16} V${f.bottom} M1702 ${f.bottom - 16} V${f.bottom} ` +
            range(7).map((j) => `M${1646 + j * 8} ${f.bottom - 16} V${f.bottom}`).join(' ')
      return [
        { d: windows, at, dur: 0.6, w: 0.9 },
        { d: middle, at: at + 0.1, dur: 0.6, w: 0.9 },
      ]
    }),
    // stair cabin and water tanks on the roof
    { d: 'M1630 44 V24 H1680 V44 M1645 44 V32 H1660 V44', at: 8.9, dur: 0.6, w: 1 },
    { d: 'M1700 44 V34 H1730 V44 M1740 44 V34 H1770 V44', at: 9.0, dur: 0.5, w: 1 },
  ],

  main: [
    // ground, drawn outward from the middle and past both edges
    { d: 'M1000 270 H-1600', at: 0, dur: 2.2, w: 2 },
    { d: 'M1000 270 H3600', at: 0, dur: 2.2, w: 2 },

    // structure: columns rise floor by floor, one grid line after another
    ...WIDE_GRID.map((g, i): Piece => ({
      d: `M${g.x - 6} 262 V170 M${g.x + 6} 262 V170 M${g.x - 6} 160 V72 M${g.x + 6} 160 V72`,
      at: 2.4 + i * 0.15,
      dur: 1.1,
      w: 1.6,
    })),
    { d: 'M1390 270 V170 M1398 270 V170', at: 3.15, dur: 0.8, w: 1.6 },
    { d: 'M640 270 V40 H704 V270', at: 2.6, dur: 1.6, w: 2 },
    { d: 'M704 270 V262 H1290 V270', at: 3.2, dur: 0.8, w: 1.6 },
    { d: rect(704, 160, 700, 10), at: 3.5, dur: 1.0, w: 2 },
    { d: rect(704, 62, 710, 10), at: 4.1, dur: 1.0, w: 2 },
    { d: 'M1404 160 V72', at: 4.4, dur: 0.5, w: 1.6 },
    { d: 'M708 62 V50 H1404 V62', at: 4.6, dur: 0.9, w: 1.4 },
    { d: 'M702 50 H1410', at: 4.9, dur: 0.5, w: 1 },
    { d: rect(634, 36, 76, 4), at: 4.3, dur: 0.5, w: 1.4 },
    { d: 'M648 36 V20 Q648 16 654 16 H690 Q696 16 696 20 V36 M648 26 H696 M664 16 V12 H680 V16', at: 5.0, dur: 0.8, w: 1.2 },
    { d: `${rect(662, 96, 16, 56)} ${rect(662, 190, 16, 56)}`, at: 5.2, dur: 0.8, w: 1.2 },

    // ground floor: entrance, glazed sliding doors, window with sunshade
    { d: 'M752 262 V176 H828 V262', at: 5.2, dur: 0.8, w: 1.6 },
    { d: 'M748 270 V266 H832 V270 M756 266 V262 H824', at: 5.3, dur: 0.6, w: 1.2 },
    { d: 'M760 262 V184 H820 V262 M790 184 V262', at: 5.5, dur: 0.8, w: 1.2 },
    { d: `${rect(766, 196, 18, 54)} ${rect(796, 196, 18, 54)}`, at: 5.8, dur: 0.7, w: 0.8 },
    { d: 'M785 222 V232 M795 222 V232', at: 6.0, dur: 0.3, w: 1.2 },
    { d: `${rect(740, 208, 6, 9)} ${rect(834, 208, 6, 9)}`, at: 6.1, dur: 0.3, w: 1 },
    { d: rect(836, 228, 12, 7), at: 6.2, dur: 0.3, w: 0.8 },
    { d: 'M872 262 V182 H988 V262 M930 182 V262 M872 198 H988', at: 5.4, dur: 1.0, w: 1.2 },
    { d: 'M1012 262 V182 H1128 V262 M1070 182 V262 M1012 198 H1128', at: 5.6, dur: 1.0, w: 1.2 },
    { d: `${rect(1160, 196, 100, 48)} M1210 196 V244`, at: 5.8, dur: 0.8, w: 1.2 },
    { d: rect(1150, 186, 120, 4), at: 6.1, dur: 0.5, w: 1.2 },
    { d: 'M1154 248 H1266', at: 6.2, dur: 0.3, w: 1.2 },

    // first floor: window, french door and glass railing, jaali, window, finned box
    { d: `${rect(740, 92, 100, 48)} M790 92 V140 M740 116 H840`, at: 6.0, dur: 0.8, w: 1.2 },
    { d: rect(732, 82, 116, 4), at: 6.3, dur: 0.5, w: 1.2 },
    { d: 'M736 144 H844', at: 6.4, dur: 0.3, w: 1.2 },
    { d: 'M876 158 V84 H984 V158 M930 84 V158 M876 98 H984', at: 6.2, dur: 0.9, w: 1.2 },
    { d: 'M864 160 V126 H996 V160 M870 131 H990', at: 6.6, dur: 0.7, w: 1.2 },
    { d: rect(1012, 82, 118, 76), at: 6.4, dur: 0.7, w: 1.4 },
    ...range(14).map((i): Piece => ({ d: `M${1020 + i * 8} 82 V158`, at: 6.7 + i * 0.07, dur: 0.3, w: 0.9 })),
    { d: 'M1012 108 H1130 M1012 132 H1130', at: 7.7, dur: 0.5, w: 0.9 },
    { d: `${rect(1160, 96, 100, 44)} M1193 96 V140 M1226 96 V140`, at: 6.8, dur: 0.8, w: 1.2 },
    { d: rect(1150, 86, 120, 4), at: 7.1, dur: 0.5, w: 1.2 },
    { d: rect(1296, 86, 100, 64), at: 6.6, dur: 0.8, w: 1.4 },
    ...range(7).map((i): Piece => ({ d: `M1296 ${94 + i * 8} H1396`, at: 6.9 + i * 0.08, dur: 0.3, w: 0.9 })),

    // terrace: pergola, solar panels, plants peeking over the parapet
    { d: 'M900 50 V18 M1100 50 V18', at: 7.8, dur: 0.6, w: 1.4 },
    { d: 'M884 18 H1116 M884 14 H1116', at: 8.0, dur: 0.7, w: 1.2 },
    { d: range(16).map((i) => `M${890 + i * 15} 14 V9`).join(' '), at: 8.3, dur: 0.6, w: 0.9 },
    { d: `${rect(1190, 28, 200, 18)} M1190 37 H1390`, at: 8.0, dur: 0.8, w: 1.2 },
    { d: range(4).map((i) => `M${1230 + i * 40} 28 V46`).join(' ') + ' M1200 46 V50 M1380 46 V50', at: 8.4, dur: 0.6, w: 0.9 },
    { d: 'M732 50 C728 40 740 34 746 40 C750 32 764 36 762 44 C768 44 768 50 764 50', at: 8.6, dur: 0.6, w: 1 },
    { d: 'M800 50 C798 42 808 38 812 42 C818 38 826 44 822 50', at: 8.7, dur: 0.5, w: 1 },

    // compound wall and gate
    { d: 'M500 270 V236 H556 M496 236 H558', at: 8.2, dur: 0.6, w: 1.4 },
    { d: 'M556 270 V224 H570 V270 M626 270 V224 H640 V270', at: 8.4, dur: 0.7, w: 1.4 },
    { d: 'M570 238 H626 M570 262 H626', at: 8.6, dur: 0.4, w: 1.2 },
    { d: range(7).map((i) => `M${577 + i * 7} 238 V262`).join(' '), at: 8.7, dur: 0.5, w: 0.9 },
    { d: 'M570 262 L626 238', at: 9.0, dur: 0.3, w: 0.9 },
    { d: `${rect(558, 217, 10, 7)} ${rect(628, 217, 10, 7)}`, at: 9.1, dur: 0.3, w: 1 },

    // car in the porch
    {
      d: 'M1306 262 H1296 V250 Q1296 242 1304 241 L1318 228 Q1322 225 1330 225 H1356 Q1364 225 1368 230 L1378 241 Q1388 242 1388 250 V262 H1380 M1330 262 H1356',
      at: 8.6,
      dur: 1.0,
      w: 1.2,
    },
    { d: `${circle(1318, 262, 8)} ${circle(1368, 262, 8)} ${circle(1318, 262, 3)} ${circle(1368, 262, 3)}`, at: 8.9, dur: 0.6, w: 1.2 },
    { d: 'M1322 240 L1332 230 H1342 V240 Z M1346 240 V230 H1360 L1369 240 Z', at: 9.1, dur: 0.6, w: 0.9 },
    { d: 'M1344 243 V258 M1350 248 H1355 M1383 247 H1387', at: 9.3, dur: 0.3, w: 0.9 },
  ],

  landscape: [
    // big tree on the left: trunk and branches, canopy, leaf detail
    { d: 'M190 270 V206 M190 236 L170 214 M190 222 L208 202', at: 9.4, dur: 0.7, w: 1.4 },
    {
      d: 'M190 214 C150 216 140 176 164 166 C156 136 196 126 206 148 C232 138 246 172 228 184 C248 196 232 222 206 214 C200 222 196 220 190 214 Z',
      at: 9.6,
      dur: 1.4,
      w: 1.2,
    },
    { d: 'M200 160 C206 156 214 160 214 166 M168 196 C164 190 170 184 176 186 M218 196 C224 194 228 198 226 204 M180 150 C184 146 190 148 190 152', at: 10.3, dur: 0.6, w: 0.8 },
    // street lamps
    { d: 'M74 270 V262 H86 V270 M80 262 V146 Q80 136 90 136 H104 M98 136 H116 L112 144 H102 Z', at: 9.5, dur: 1.0, w: 1.2 },
    { d: 'M1956 270 V262 H1944 V270 M1950 262 V146 Q1950 136 1940 136 H1926 M1932 136 H1914 L1918 144 H1928 Z', at: 9.7, dur: 1.0, w: 1.2 },
    // cypress trees
    { d: 'M1840 270 V232 M1840 234 C1816 228 1820 142 1840 102 C1860 142 1864 228 1840 234 Z', at: 9.8, dur: 1.2, w: 1.2 },
    { d: 'M1886 270 V242 M1886 244 C1868 240 1870 178 1886 150 C1902 178 1904 240 1886 244 Z', at: 10.0, dur: 1.0, w: 1.2 },
    // potted plants at the entrance, shrubs along the street
    { d: plant(740, 270), at: 9.6, dur: 0.8, w: 1 },
    { d: plant(840, 270), at: 9.7, dur: 0.8, w: 1 },
    { d: 'M508 270 C506 258 522 254 526 262 C530 254 546 258 542 270', at: 10.0, dur: 0.6, w: 1 },
    { d: 'M1796 270 C1794 258 1810 252 1816 262 C1822 254 1834 260 1830 270', at: 10.1, dur: 0.6, w: 1 },
    { d: 'M240 270 C238 260 252 256 256 264 C260 258 270 262 268 270', at: 10.2, dur: 0.5, w: 1 },
    // crescent moon
    { d: 'M1916 28 A18 18 0 1 0 1928 56 A14 14 0 1 1 1916 28 Z', at: 10.2, dur: 1.0, w: 1 },
  ],

  birds: [
    { d: 'M410 70 q6 -6 12 0 q6 -6 12 0', at: 10.4, dur: 0.4, w: 1 },
    { d: 'M442 56 q5 -5 10 0 q5 -5 10 0', at: 10.5, dur: 0.4, w: 1 },
    { d: 'M468 76 q4 -4 8 0 q4 -4 8 0', at: 10.6, dur: 0.4, w: 1 },
  ],

  lights: [
    { x: 872, y: 182, w: 116, h: 80, at: 10.3 },
    { x: 1012, y: 182, w: 116, h: 80, at: 10.45 },
    { x: 1160, y: 196, w: 100, h: 48, at: 10.6 },
    { x: 876, y: 84, w: 108, h: 74, at: 10.75 },
    { x: 662, y: 190, w: 16, h: 56, at: 10.85 },
    { x: 760, y: 184, w: 60, h: 78, at: 10.95, o: 0.12 },
    { x: 740, y: 92, w: 100, h: 48, at: 11.05 },
    { x: 662, y: 96, w: 16, h: 56, at: 11.15 },
    { x: 1012, y: 82, w: 118, h: 76, at: 11.25 },
    { x: 1160, y: 96, w: 100, h: 44, at: 11.4 },
    { x: 1296, y: 86, w: 100, h: 64, at: 11.5 },
    // neighbours: a few windows only
    { x: 290, y: 134, w: 60, h: 42, at: 11.6, o: 0.15 },
    { x: 1566, y: 174, w: 50, h: 26, at: 11.65, o: 0.15 },
    { x: 1724, y: 64, w: 50, h: 26, at: 11.75, o: 0.15 },
    { x: 290, y: 206, w: 60, h: 44, at: 11.8, o: 0.15 },
    { x: 1724, y: 229, w: 50, h: 26, at: 11.9, o: 0.15 },
    { x: 1566, y: 119, w: 50, h: 26, at: 12.05, o: 0.15 },
  ],

  glows: [
    { cx: 107, cy: 146, r: 30, at: 10.0 },
    { cx: 1923, cy: 146, r: 30, at: 10.15 },
    { cx: 563, cy: 220, r: 14, at: 10.35 },
    { cx: 633, cy: 220, r: 14, at: 10.4 },
    { cx: 743, cy: 212, r: 12, at: 10.55 },
    { cx: 837, cy: 212, r: 12, at: 10.6 },
  ],
}

/* ============================================================ tall house */

/*
 * Phone composition: one three-storey house (ground floor, two upper floors)
 * with a stair tower and water tank on the right, a crane on the left that is
 * replaced by a tree once the house is finished.
 *
 *   floor levels   plinth 462–470 · slabs 360–370, 260–270 · roof 160–170
 *   bays           A–B (75–195) · B–C (205–325) · stair tower 336–384
 */

const TALL_GRID = [
  { x: 70, label: 'A' },
  { x: 200, label: 'B' },
  { x: 330, label: 'C' },
]

const tallGrid = gridAnnotations(TALL_GRID, 470, 140)

const tallScene: Scene = {
  viewBox: '0 0 400 540',

  annotations: [
    earthHatch(-20, 32, 470),
    ...tallGrid.pieces,
    ...[...TALL_GRID.map((g) => g.x), 360].map((x, i) => footing(x, 470, 1.8 + i * 0.1)),
  ],

  labels: tallGrid.labels,

  crane: [
    { d: 'M6 470 V462 H36 V470', at: 1.0, dur: 0.4 },
    { d: 'M14 470 V48 M28 470 V48', at: 1.1, dur: 1.4 },
    { d: 'M14 470 ' + range(30).map((i) => `L${i % 2 === 0 ? 28 : 14} ${456 - i * 14}`).join(' '), at: 1.5, dur: 1.6, w: 0.8 },
    { d: 'M-40 40 H300 M-40 48 H300', at: 2.1, dur: 1.0 },
    { d: 'M28 48 ' + range(19).map((i) => `L${42 + i * 14} ${i % 2 === 0 ? 40 : 48}`).join(' '), at: 2.4, dur: 1.0, w: 0.8 },
    { d: 'M14 48 L0 40 L-14 48 L-28 40 L-40 48', at: 2.5, dur: 0.5, w: 0.8 },
    { d: 'M14 40 L21 26 L28 40 M21 26 L290 40 M21 26 L-36 40', at: 2.7, dur: 0.8, w: 0.8 },
    { d: rect(-38, 48, 22, 14), at: 2.9, dur: 0.4 },
    { d: rect(28, 48, 12, 11), at: 3.0, dur: 0.4 },
    { d: `${rect(244, 48, 12, 4)} M250 52 V64 M250 64 q0 6 -5 6`, at: 3.1, dur: 0.6, w: 1 },
  ],

  background: [],

  main: [
    // ground, drawn outward from the middle and past both edges
    { d: 'M200 470 H-600', at: 0, dur: 2.2, w: 2 },
    { d: 'M200 470 H1000', at: 0, dur: 2.2, w: 2 },

    // structure: columns rise floor by floor, then plinth, slabs, roof, tower
    ...TALL_GRID.map((g, i): Piece => ({
      d:
        `M${g.x - 5} 462 V370 M${g.x + 5} 462 V370 ` +
        `M${g.x - 5} 360 V270 M${g.x + 5} 360 V270 ` +
        `M${g.x - 5} 260 V170 M${g.x + 5} 260 V170`,
      at: 2.4 + i * 0.2,
      dur: 1.4,
      w: 1.6,
    })),
    { d: 'M336 470 V120 H384 V470', at: 2.6, dur: 1.8, w: 2 },
    { d: 'M56 470 V462 H336', at: 3.2, dur: 0.8, w: 1.6 },
    { d: rect(56, 360, 280, 10), at: 3.5, dur: 0.9, w: 2 },
    { d: rect(56, 260, 280, 10), at: 3.9, dur: 0.9, w: 2 },
    { d: rect(52, 160, 284, 10), at: 4.3, dur: 0.9, w: 2 },
    { d: rect(330, 116, 60, 4), at: 4.5, dur: 0.5, w: 1.4 },
    { d: 'M60 160 V146 H336', at: 4.7, dur: 0.8, w: 1.4 },
    { d: 'M54 146 H338', at: 5.0, dur: 0.5, w: 1 },
    { d: 'M344 116 V100 Q344 96 350 96 H372 Q378 96 378 100 V116 M344 106 H378 M354 96 V92 H368 V96', at: 5.1, dur: 0.8, w: 1.2 },
    { d: `${rect(354, 400, 12, 48)} ${rect(354, 300, 12, 48)} ${rect(354, 200, 12, 48)}`, at: 5.3, dur: 1.0, w: 1.2 },

    // ground floor: entrance with steps, panels, handles, lamps, house number; glazing
    { d: 'M104 462 V384 H166 V462', at: 5.2, dur: 0.8, w: 1.6 },
    { d: 'M100 470 V466 H170 V470 M106 466 V462 H164', at: 5.3, dur: 0.6, w: 1.2 },
    { d: 'M110 462 V390 H160 V462 M135 390 V462', at: 5.5, dur: 0.8, w: 1.2 },
    { d: `${rect(115, 402, 14, 48)} ${rect(141, 402, 14, 48)}`, at: 5.8, dur: 0.7, w: 0.8 },
    { d: 'M131 424 V432 M139 424 V432', at: 6.0, dur: 0.3, w: 1.2 },
    { d: `${rect(90, 410, 6, 9)} ${rect(174, 410, 6, 9)}`, at: 6.1, dur: 0.3, w: 1 },
    { d: rect(176, 423, 12, 7), at: 6.2, dur: 0.3, w: 0.8 },
    { d: 'M212 462 V382 H318 V462 M265 382 V462 M212 398 H318', at: 5.4, dur: 1.0, w: 1.2 },

    // first floor: window with sunshade and sill; jaali screen slat by slat
    { d: `${rect(90, 288, 90, 46)} M135 288 V334 M90 311 H180`, at: 6.0, dur: 0.8, w: 1.2 },
    { d: rect(84, 280, 102, 4), at: 6.3, dur: 0.5, w: 1.2 },
    { d: 'M86 338 H184', at: 6.4, dur: 0.3, w: 1.2 },
    { d: rect(212, 282, 106, 76), at: 6.4, dur: 0.7, w: 1.4 },
    ...range(12).map((i): Piece => ({ d: `M${220 + i * 8} 282 V358`, at: 6.7 + i * 0.08, dur: 0.3, w: 0.9 })),
    { d: 'M212 306 H318 M212 334 H318', at: 7.7, dur: 0.5, w: 0.9 },

    // second floor: french door behind a glass balcony railing; box window with fins
    { d: 'M92 258 V184 H178 V258 M135 184 V258 M92 198 H178', at: 6.6, dur: 0.9, w: 1.2 },
    { d: 'M84 260 V228 H186 V260 M90 233 H180', at: 7.0, dur: 0.7, w: 1.2 },
    { d: rect(212, 184, 106, 64), at: 6.8, dur: 0.8, w: 1.4 },
    ...range(7).map((i): Piece => ({ d: `M212 ${192 + i * 8} H318`, at: 7.1 + i * 0.08, dur: 0.3, w: 0.9 })),

    // terrace: pergola, solar panels, plants peeking over the parapet
    { d: 'M100 146 V112 M190 146 V112', at: 7.8, dur: 0.6, w: 1.4 },
    { d: 'M88 112 H202 M88 108 H202', at: 8.0, dur: 0.7, w: 1.2 },
    { d: range(8).map((i) => `M${94 + i * 15} 108 V103`).join(' '), at: 8.3, dur: 0.6, w: 0.9 },
    { d: `${rect(230, 122, 96, 18)} M230 131 H326`, at: 8.0, dur: 0.8, w: 1.2 },
    { d: 'M262 122 V140 M294 122 V140 M238 140 V146 M318 140 V146', at: 8.4, dur: 0.6, w: 0.9 },
    { d: 'M66 146 C62 136 74 130 80 136 C84 128 96 132 94 140 C100 140 100 146 96 146', at: 8.6, dur: 0.6, w: 1 },
  ],

  landscape: [
    // the tree that takes the crane's place
    { d: 'M32 470 V404 M32 432 L18 412 M32 420 L46 402', at: 9.4, dur: 0.7, w: 1.4 },
    {
      d: 'M32 410 C10 412 4 386 16 378 C10 356 34 348 42 362 C58 356 64 378 54 386 C62 398 52 414 40 410 C38 414 34 414 32 410 Z',
      at: 9.6,
      dur: 1.4,
      w: 1.2,
    },
    { d: 'M24 372 C28 368 34 370 34 374 M12 394 C10 390 14 386 18 388 M46 392 C50 390 54 394 52 398', at: 10.3, dur: 0.6, w: 0.8 },
    // potted plants at the entrance, shrubs in front of the glazing
    { d: plant(88, 470), at: 9.6, dur: 0.8, w: 1 },
    { d: plant(181, 470), at: 9.7, dur: 0.8, w: 1 },
    { d: 'M224 470 C222 462 234 458 238 464 C242 458 252 462 250 470', at: 10.0, dur: 0.5, w: 1 },
    { d: 'M290 470 C288 462 300 458 304 464 C308 458 318 462 316 470', at: 10.1, dur: 0.5, w: 1 },
    // crescent moon
    { d: 'M362 24 A18 18 0 1 0 374 52 A14 14 0 1 1 362 24 Z', at: 10.2, dur: 1.0, w: 1 },
  ],

  birds: [
    { d: 'M236 78 q5 -5 10 0 q5 -5 10 0', at: 10.4, dur: 0.4, w: 1 },
    { d: 'M262 68 q4 -4 8 0 q4 -4 8 0', at: 10.5, dur: 0.4, w: 1 },
    { d: 'M284 84 q4 -4 8 0 q4 -4 8 0', at: 10.6, dur: 0.4, w: 1 },
  ],

  lights: [
    { x: 212, y: 382, w: 106, h: 80, at: 10.3 },
    { x: 90, y: 288, w: 90, h: 46, at: 10.6 },
    { x: 92, y: 184, w: 86, h: 74, at: 10.75 },
    { x: 354, y: 400, w: 12, h: 48, at: 10.85 },
    { x: 110, y: 390, w: 50, h: 72, at: 10.95, o: 0.12 },
    { x: 354, y: 300, w: 12, h: 48, at: 11.05 },
    { x: 212, y: 282, w: 106, h: 76, at: 11.2 },
    { x: 212, y: 184, w: 106, h: 64, at: 11.4 },
    { x: 354, y: 200, w: 12, h: 48, at: 11.55 },
  ],

  glows: [
    { cx: 93, cy: 414, r: 13, at: 10.45 },
    { cx: 177, cy: 414, r: 13, at: 10.5 },
  ],
}

/* ------------------------------------------------------------ drawing */

const scenes = { wide: wideScene, tall: tallScene }

export function StreetElevation({ layout, className = '' }: { layout: 'wide' | 'tall'; className?: string }) {
  const reduceMotion = useReducedMotion()
  const scene = scenes[layout]
  const glowId = `street-elevation-glow-${layout}`

  return (
    <motion.svg
      viewBox={scene.viewBox}
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor={LIGHT} stopOpacity="0.7" />
          <stop offset="100%" stopColor={LIGHT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* lights sit under the line work */}
      {scene.lights.map((l) => (
        <motion.rect
          key={`${l.x}-${l.y}`}
          x={l.x}
          y={l.y}
          width={l.w}
          height={l.h}
          stroke="none"
          fill={LIGHT}
          custom={l}
          variants={lightUp}
        />
      ))}
      {scene.glows.map((g) => (
        <motion.circle
          key={`${g.cx}-${g.cy}`}
          cx={g.cx}
          cy={g.cy}
          r={g.r}
          stroke="none"
          fill={`url(#${glowId})`}
          custom={g.at}
          variants={glowOn}
        />
      ))}

      {/* survey and drafting annotations, kept light */}
      <g opacity={0.55}>
        <Pieces items={scene.annotations} />
        {scene.labels.map((t) => (
          <motion.text
            key={`${t.text}-${t.x}-${t.y}`}
            x={t.x}
            y={t.y}
            textAnchor={t.anchor}
            fontSize={10}
            fontFamily="DM Sans, sans-serif"
            letterSpacing={0.5}
            fill="currentColor"
            stroke="none"
            custom={t}
            variants={fade}
          >
            {t.text}
          </motion.text>
        ))}
      </g>

      {/* the crane goes up first and is taken away once the house is built */}
      <motion.g variants={craneLeaves}>
        <Pieces items={scene.crane} />
      </motion.g>

      {/* neighbours in lighter line weight, as on a real elevation */}
      <g opacity={0.6}>
        <Pieces items={scene.background} />
      </g>

      <Pieces items={scene.main} />

      <g opacity={0.85}>
        <Pieces items={scene.landscape} />
      </g>

      <motion.g variants={birdsDrift}>
        <Pieces items={scene.birds} />
      </motion.g>
    </motion.svg>
  )
}
