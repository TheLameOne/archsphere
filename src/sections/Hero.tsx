import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-scroll'
import { ArrowDown } from 'lucide-react'
import heroImg from '@/assets/residential/elevation/3d_render/Designer.png'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imgY    = useTransform(scrollYProgress, [0, 1], ['0%',  '30%'])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%',  '-15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  }
  const word = {
    hidden: { opacity: 0, y: 60, skewY: 4 },
    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: 'easeOut' as const } },
  }

  return (
    <section id="hero" ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden">

      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ y: imgY }}
      >
        <img
          src={heroImg}
          alt="Archsphere signature project"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-300/70 via-dark-300/50 to-dark-300/80" />
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
        />
      </motion.div>

      {/* Floating decorative lines */}
      <motion.div
        className="absolute top-1/4 right-10 md:right-20 w-px h-32 bg-beige-200/30"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute top-1/4 right-10 md:right-20 w-12 h-px bg-beige-200/30 mt-32"
        initial={{ scaleX: 0, originX: 1 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center section-padding container-wide"
        style={{ y: textY, opacity }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-px bg-beige-200/60" />
          <span className="label-text text-beige-200/80 text-[10px]">
            Architecture &amp; Interior Design Studio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <div className="overflow-hidden mb-2">
            <motion.h1 variants={word} className="heading-xl text-cream-100 block">
              Designing
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1 variants={word} className="heading-xl text-cream-100 block">
              Spaces That
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={word}
              className="heading-xl block"
              style={{ WebkitTextStroke: '1px rgba(212, 196, 176, 0.6)', color: 'transparent' }}
            >
              Transcend
            </motion.h1>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-6 max-w-md text-beige-100/70 font-sans text-base md:text-lg leading-relaxed"
        >
          We craft architecture and interiors that balance beauty,
          function, and purpose — built to inspire for generations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-wrap items-center gap-4 mt-10"
        >
          <Link
            to="portfolio"
            smooth
            duration={800}
            offset={-80}
            className="px-7 py-3.5 bg-brown-400 hover:bg-brown-500 text-cream-100 label-text rounded-sm transition-all duration-300 hover:scale-[1.02]"
          >
            View Our Work
          </Link>
          <Link
            to="contact"
            smooth
            duration={800}
            offset={-80}
            className="px-7 py-3.5 border border-cream-200/40 hover:border-beige-200 text-cream-200 label-text rounded-sm transition-all duration-300 hover:bg-white/5"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="label-text text-beige-200/50 text-[9px]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-beige-200/50" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-cream-100 to-transparent" />
    </section>
  )
}
