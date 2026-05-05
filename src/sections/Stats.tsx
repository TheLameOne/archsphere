import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { staggerContainer, staggerItem } from '@/components/SectionWrapper'

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 12,  suffix: '+', label: 'Years of Excellence' },
  { value: 300, suffix: '+', label: 'Happy Clients' },
  { value: 25,  suffix: '',  label: 'Design Awards' },
]

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count  = useCountUp(value, inView, 2000)

  return (
    <motion.div ref={ref} variants={staggerItem} className="text-center group">
      <div className="relative inline-block">
        <span className="font-serif text-5xl md:text-6xl font-semibold text-brown-400">
          {count}{suffix}
        </span>
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-brown-400/40"
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </div>
      <p className="mt-3 label-text text-olive-300 text-[11px]">{label}</p>
    </motion.div>
  )
}

export function Stats() {
  return (
    <section className="py-16 bg-cream-200 border-y border-beige-100">
      <div className="container-wide section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6"
        >
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
