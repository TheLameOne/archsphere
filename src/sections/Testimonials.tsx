import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Archsphere didn\'t just design our home — they distilled our life into space. Every corner speaks of us. The process was seamless, the result is extraordinary.',
    author: 'Neha & Vikram Sharma',
    role: 'Residential Client, Delhi',
    rating: 5,
  },
  {
    quote:
      'Our new office has transformed how our team collaborates. The space feels alive, purposeful, and completely aligned with our brand identity. An exceptional team.',
    author: 'Anjali Desai',
    role: 'CEO, Luminos Ventures',
    rating: 5,
  },
  {
    quote:
      'The 3D visualizations Archsphere produced were indistinguishable from photographs. It allowed our investors to fall in love with the project long before construction began.',
    author: 'Raj Malhotra',
    role: 'Real Estate Developer',
    rating: 5,
  },
  {
    quote:
      'From the first sketch to the last detail of the fitout, the team was thorough, creative, and genuinely invested in getting it right. I\'d work with them on every project.',
    author: 'Meera Nair',
    role: 'Restaurant Owner, Mumbai',
    rating: 5,
  },
]

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' })
  }

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-dark-300 overflow-hidden">
      <div className="container-wide section-padding">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-brown-400" />
              <span className="label-text text-brown-400 text-[10px]">Client Words</span>
            </div>
            <h2 className="heading-lg text-cream-100">
              What They <span className="italic text-brown-300">Say</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-sm border border-white/10 flex items-center justify-center text-beige-200/60 hover:bg-brown-400 hover:text-cream-100 hover:border-brown-400 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-sm border border-white/10 flex items-center justify-center text-beige-200/60 hover:bg-brown-400 hover:text-cream-100 hover:border-brown-400 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex-none w-80 md:w-96 p-7 rounded-sm border border-white/5 bg-white/3 hover:bg-white/5 transition-colors"
              style={{ scrollSnapAlign: 'start' }}
            >
              <Quote size={24} className="text-brown-400/50 mb-5" />
              <p className="text-beige-100/70 text-sm leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-brown-300 text-xs">★</span>
                ))}
              </div>
              <div>
                <p className="font-serif text-cream-100 font-medium">{t.author}</p>
                <p className="label-text text-[10px] text-beige-200/40 mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
