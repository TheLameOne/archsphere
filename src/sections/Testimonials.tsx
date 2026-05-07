import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'We had a tight budget and weren\'t sure what was possible. The team heard us out and gave us a plan that actually worked. Our home looks nothing like what we thought we could afford.',
    author: 'Priya & Suresh Kumar',
    role: 'Homeowner, Gandhinagar',
    rating: 5,
  },
  {
    quote:
      'Honestly I was a bit nervous handing over the whole interior to someone else, but they kept checking in with us at every step. The final result felt very "us". Really happy we went with them.',
    author: 'Karan Mehta',
    role: 'First-time homeowner, Bopal',
    rating: 5,
  },
  {
    quote:
      'Got the 3D render done before finalising the layout. Saved us from a mistake we would have regretted. The visualisation was so clear my wife and I finally agreed on the kitchen!',
    author: 'Deepak Yadav',
    role: 'Client, Anand',
    rating: 5,
  },
  {
    quote:
      'They handled everything from drawings to site supervision. I was working a full-time job and barely had time — they kept me updated over WhatsApp and nothing slipped through. Good experience overall.',
    author: 'Sunita Rawat',
    role: 'Client, Ahmedabad',
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
    <section id="testimonials" className="py-24 md:py-32 bg-dark-300">

        {/* Header */}
        <div className="container-wide section-padding">
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
        </div>

        {/* Scroll Container — full-bleed so first/last cards aren't clipped */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide px-6 md:px-12 lg:px-20 xl:px-28"
          style={{ scrollSnapType: 'x mandatory', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex-none w-80 md:w-96 p-7 rounded-sm border border-white/5 bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
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

    </section>
  )
}
