import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function PageIntro() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Top curtain */}
          <motion.div
            key="curtain-top"
            className="fixed inset-x-0 top-0 h-1/2 bg-dark-400 z-[9998]"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Bottom curtain */}
          <motion.div
            key="curtain-bottom"
            className="fixed inset-x-0 bottom-0 h-1/2 bg-dark-400 z-[9998]"
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Centered logo */}
          <motion.div
            key="curtain-logo"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.p
              className="font-serif text-3xl md:text-4xl text-cream-100 uppercase"
              initial={{ letterSpacing: '0.6em', opacity: 0 }}
              animate={{ letterSpacing: '0.25em', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Archsphere
            </motion.p>

            <motion.div
              className="h-px bg-brown-400/60 mt-4"
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="label-text text-[9px] text-beige-200/50 mt-3 tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              ARCHITECTURE & INTERIOR DESIGN
            </motion.p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
