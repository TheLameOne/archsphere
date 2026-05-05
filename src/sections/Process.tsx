import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/components/SectionWrapper'
import designImg  from '@/assets/residential/elevation/sketchup/1777196207170.png'
import developImg from '@/assets/residential/elevation/sketchup/SAVE_20260205_093545.jpg'

const steps: Array<{ number: string; title: string; description: string; image: string | null }> = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We begin with listening. Deep conversations about your aspirations, lifestyle, and vision help us understand not just what you need, but who you are.',
    image: null,
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Concept sketches evolve into detailed plans. We explore materials, spatial relationships, and natural light — iterating until the design feels inevitable.',
    image: designImg,
  },
  {
    number: '03',
    title: 'Develop',
    description:
      'Technical drawings, structural coordination, and material specifications are resolved with precision. We ensure every detail is buildable and beautiful.',
    image: developImg,
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'On-site oversight and close collaboration with contractors bring the design to life. We stay involved until the final handover — ensuring zero compromise.',
    image: null,
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-cream-100 overflow-hidden">
      <div className="container-wide section-padding">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-brown-400" />
            <span className="label-text text-brown-400 text-[10px]">How We Work</span>
          </div>
          <h2 className="heading-lg text-dark-300">
            Our <span className="italic text-brown-400">Process</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[28px] md:left-1/2 top-0 w-px bg-beige-200 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '100%' }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-0"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={staggerItem}
                className={`relative flex items-start gap-8 pb-14 ${
                  step.image ? 'md:min-h-[260px]' : ''
                } ${
                  i % 2 === 0
                    ? 'md:flex-row md:pr-[calc(50%+2rem)]'
                    : 'md:flex-row-reverse md:pl-[calc(50%+2rem)]'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 top-0 w-[14px] h-[14px] rounded-full bg-brown-400 border-2 border-cream-100 z-10" />

                {/* Card */}
                <div className="ml-14 md:ml-0 flex-1 group p-7 rounded-sm border border-beige-100 bg-cream-200/60 hover:bg-cream-200 hover:border-beige-200 hover:shadow-md transition-all duration-400">
                  <span className="font-serif text-4xl font-semibold text-beige-200 group-hover:text-brown-400/30 transition-colors select-none">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-2xl text-dark-300 mt-2 mb-3">{step.title}</h3>
                  <p className="text-dark-200/60 text-sm leading-relaxed">{step.description}</p>
                  {step.image && (
                    <div className="mt-5 md:hidden overflow-hidden rounded-sm aspect-video">
                      <img src={step.image} alt={`${step.title} reference`} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Desktop floating image on opposite side of timeline */}
                {step.image && (
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className={`hidden md:block absolute top-2 w-[calc(50%-3.5rem)] aspect-video overflow-hidden rounded-sm border border-beige-100 shadow-sm ${
                      i % 2 === 0 ? 'left-[calc(50%+2rem)]' : 'right-[calc(50%+2rem)]'
                    }`}
                  >
                    <img src={step.image} alt={`${step.title} reference`} className="w-full h-full object-cover" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
