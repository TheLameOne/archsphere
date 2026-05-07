import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/components/SectionWrapper'

const faqs = [
  {
    q: 'How long does a typical architectural project take?',
    a: 'Timelines vary by project scope. A residential design project typically spans 3–6 months from concept to construction documents. Larger commercial projects can take 6–18 months. We provide a detailed project schedule at the start of every engagement.',
  },
  {
    q: 'Do you handle interior design alongside architecture?',
    a: 'Yes. We offer fully integrated architecture and interior design services. Many clients choose to work with us on both for a seamless, cohesive result — from spatial planning to material selection and furniture specification.',
  },
  {
    q: 'What is your fee structure?',
    a: 'Our fees are structured as a percentage of the construction cost for full-service projects, or as a fixed fee for specific deliverables. We\'ll provide a transparent proposal after an initial consultation.',
  },

  {
    q: 'Do you provide 3D renderings before construction?',
    a: 'Yes — 3D visualization is part of our design process. We create photorealistic renders and, on larger projects, immersive walkthroughs so you can experience the space before a single brick is placed.',
  },
  {
    q: 'How involved will I be in the design process?',
    a: 'As much as you want to be. We design with you, not just for you. Regular design reviews, collaborative workshops, and open feedback loops ensure your vision guides every decision.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 md:py-32 bg-cream-100 overflow-hidden">
      <div className="container-wide section-padding">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:sticky md:top-28"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-brown-400" />
              <span className="label-text text-brown-400 text-[10px]">Common Questions</span>
            </div>
            <h2 className="heading-lg text-dark-300">
              Frequently<br />
              <span className="italic text-brown-400">Asked</span>
            </h2>
            <p className="mt-5 text-dark-200/60 text-sm leading-relaxed max-w-xs">
              Have more questions? We're happy to talk through your project in a free
              30-minute consultation.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`border rounded-sm overflow-hidden transition-colors duration-300 ${
                  open === i ? 'border-beige-200 bg-cream-200' : 'border-beige-100 bg-cream-100 hover:border-beige-200'
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="font-sans text-sm font-medium text-dark-200">{faq.q}</span>
                  <span className="flex-none text-brown-400">
                    {open === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-dark-200/60 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
