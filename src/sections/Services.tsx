import { motion } from 'framer-motion'
import { Home, Building2, Palette, Box, Map } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/components/SectionWrapper'

const services = [
  {
    icon: Home,
    title: 'Residential Architecture',
    description:
      'Bespoke homes designed around how you live — blending spatial efficiency, natural light, and materials that age beautifully.',
    accent: 'from-brown-400/10 to-beige-100/30',
  },
  {
    icon: Building2,
    title: 'Commercial Architecture',
    description:
      'Corporate spaces, retail environments, and hospitality venues crafted to amplify brand identity and user experience.',
    accent: 'from-olive-300/10 to-beige-100/30',
  },
  {
    icon: Palette,
    title: 'Interior Design',
    description:
      'Curated interiors where every material, texture, and object is chosen to create a cohesive and intentional narrative.',
    accent: 'from-brown-300/10 to-beige-100/30',
  },
  {
    icon: Box,
    title: '3D Visualization',
    description:
      'Photorealistic renders and walkthrough animations that let you experience your project before a single brick is laid.',
    accent: 'from-brown-500/10 to-beige-100/30',
  },
  {
    icon: Map,
    title: 'Urban Planning',
    description:
      'Thoughtful master planning and landscape integration that balances density, greenery, and community-centered design.',
    accent: 'from-olive-400/10 to-beige-100/30',
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-dark-300 overflow-hidden">
      <div className="container-wide section-padding">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-brown-400" />
            <span className="label-text text-brown-400 text-[10px]">What We Offer</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="heading-lg text-cream-100 max-w-md">
              Services Built for<br />
              <span className="italic text-brown-300">Every Vision</span>
            </h2>
            <p className="text-beige-200/50 max-w-xs text-sm leading-relaxed">
              From conceptual sketches to construction documentation,
              we cover the full spectrum of design.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.title}
                variants={staggerItem}
                className={`group relative p-7 rounded-sm border border-white/5 bg-gradient-to-br ${svc.accent} hover:border-beige-200/20 transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Number */}
                <span className="absolute top-6 right-6 font-serif text-4xl font-semibold text-white/5 group-hover:text-white/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className="w-11 h-11 rounded-sm bg-brown-400/20 border border-brown-400/30 flex items-center justify-center mb-6 group-hover:bg-brown-400/30 transition-colors">
                  <Icon size={18} className="text-brown-300" />
                </div>

                <h3 className="font-serif text-lg text-cream-100 mb-3 group-hover:text-beige-100 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-beige-200/50 text-sm leading-relaxed group-hover:text-beige-200/70 transition-colors">
                  {svc.description}
                </p>

                {/* Hover line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-brown-400/60 rounded-b-sm"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
