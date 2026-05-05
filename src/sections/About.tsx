import { motion } from 'framer-motion'
import { slideInLeft, slideInRight } from '@/components/SectionWrapper'
import aboutImg from '@/assets/image2.png'

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-cream-100 overflow-hidden">
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
              <img
                src={aboutImg}
                alt="Archsphere design philosophy"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
            </div>
            {/* Decorative offset frame */}
            <div className="absolute -bottom-6 -right-6 w-2/3 h-1/2 border border-beige-200 rounded-sm -z-10" />
            {/* Year badge */}
            <div className="absolute top-6 -right-4 md:-right-8 bg-brown-400 text-cream-100 px-4 py-5 text-center rounded-sm">
              <span className="font-serif text-2xl font-semibold block">12</span>
              <span className="label-text text-[9px] text-beige-100/80">Years</span>
            </div>
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
              Founded in 2012, Archsphere began with a singular conviction: that great design
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
