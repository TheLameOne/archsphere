import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { slideInLeft, slideInRight } from '@/components/SectionWrapper'
import { DimensionLine } from '@/components/Drafting'
import aboutImg from '@/assets/residential/elevation/3d_render/433b3a93-5d21-4a71-a0f7-ccadb6c8b0ac(1).png'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // scale 1.1 gives 5% of bleed on each edge, so keep the travel within ±5%
  const imgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-cream-100 overflow-hidden">
      <div className="container-wide section-padding">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image side */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
              <motion.img
                src={aboutImg}
                alt="Archsphere design philosophy"
                style={{ y: imgY, scale: 1.1 }}
                className="w-full h-full object-cover object-right"
              />
            </div>
            {/* Dimension lines, as on an elevation drawing */}
            <DimensionLine delay={0.5} className="absolute left-0 right-0 -bottom-9 text-brown-400/50" />
            <DimensionLine vertical delay={0.7} className="hidden md:block absolute top-0 bottom-0 -left-9 text-brown-400/50" />
            {/* Year badge */}
            {/* <div className="absolute top-6 -right-4 md:-right-8 bg-brown-400 text-cream-100 px-4 py-5 text-center rounded-sm">
              <span className="font-serif text-2xl font-semibold block">12</span>
              <span className="label-text text-[9px] text-beige-100/80">Years</span>
            </div> */}
          </motion.div>

          {/* Text side */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-brown-400" />
              <span className="label-text text-brown-400 text-[10px]">Our Story</span>
            </div>

            <h2 className="heading-lg text-dark-300 mb-6">
              We Build More Than<br />
              <span className="italic text-brown-400">Architecture</span>
            </h2>

            <p className="text-dark-200/70 leading-relaxed mb-5">
              Archsphere began with a singular conviction: that great design
              is not a luxury but a necessity. Every space we create carries the weight of human
              experience — the warmth of a home, the ambition of a workplace, the memory of a place.
            </p>

            <p className="text-dark-200/70 leading-relaxed mb-8">
              We blend timeless craftsmanship with contemporary thinking, producing spaces that
              are as functional as they are breathtaking. From residential havens to landmark
              commercial structures, our work speaks in textures, light, and enduring form.
            </p>

            {/* Philosophy tags */}
            <div className="flex flex-wrap gap-3">
              {['Timeless Design', 'Sustainable Practice', 'Human-Centered', 'Crafted Detail'].map((tag) => (
                <span
                  key={tag}
                  className="label-text text-[10px] px-4 py-2 border border-beige-200 text-olive-300 rounded-sm hover:bg-beige-100 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
