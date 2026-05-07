import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef    = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(-10)
  const mouseY = useMotionValue(-10)

  const springConfig = { damping: 1, stiffness: 100, mass: 0.001 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const dotX = useMotionValue(-10)
  const dotY = useMotionValue(-10)
  const hasInit = useRef(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX - 20
      const y = e.clientY - 20
      if (!hasInit.current) {
        cursorX.jump(x)
        cursorY.jump(y)
        hasInit.current = true
      }
      mouseX.set(x)
      mouseY.set(y)
      dotX.set(e.clientX - 4)
      dotY.set(e.clientY - 4)
    }

    const addHover = () => cursorRef.current?.classList.add('scale-[2.5]', 'bg-brown-300/10', 'border-brown-300')
    const removeHover = () => cursorRef.current?.classList.remove('scale-[2.5]', 'bg-brown-300/10', 'border-brown-300')

    window.addEventListener('mousemove', moveCursor)

    const interactables = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [mouseX, mouseY, dotX, dotY])

  return (
    <>
      {/* Cursor ring */}
      {/* <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-brown-400/60 pointer-events-none z-[9999] transition-[transform,background-color,border-color] duration-200"
        style={{ x: cursorX, y: cursorY }}
      /> */}
      {/* Cursor dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brown-400 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
      />
    </>
  )
}
