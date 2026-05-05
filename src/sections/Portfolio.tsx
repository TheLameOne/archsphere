import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/components/SectionWrapper'
import img1 from '@/assets/image.png'
import img2 from '@/assets/image2.png'
import img3 from '@/assets/image3.png'
import img4 from '@/assets/image4.png'
import img5 from '@/assets/image5.png'

const projects = [
  { img: img1, title: 'The Kessler Residence',  category: 'Residential Architecture', year: '2024' },
  { img: img2, title: 'Solara Living',           category: 'Interior Design',          year: '2024' },
  { img: img3, title: 'Northside Commerce Hub',  category: 'Commercial Architecture',  year: '2023' },
  { img: img4, title: 'The Lumière Apartment',   category: 'Interior Design',          year: '2023' },
  { img: img5, title: 'Meridian Spa & Wellness', category: '3D Visualization',         year: '2022' },
]

export function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-cream-200 overflow-hidden">
      <div className="container-wide section-padding">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-brown-400" />
            <span className="label-text text-brown-400 text-[10px]">Selected Work</span>
          </div>
          <h2 className="heading-lg text-dark-300">
            Our <span className="italic text-brown-400">Portfolio</span>
          </h2>
        </motion.div>

        {/* Masonry-style grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '3/4' : '4/3' }}
              onClick={() => setSelected(i)}
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/90 via-dark-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* Zoom icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-100/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                <ZoomIn size={14} className="text-cream-100" />
              </div>
              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="label-text text-beige-200/70 text-[10px] mb-1">{p.category} · {p.year}</p>
                <h3 className="font-serif text-lg text-cream-100">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-dark-400/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full max-h-full overflow-hidden rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={projects[selected].img}
                alt={projects[selected].title}
                className="w-full object-contain max-h-[80vh]"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-dark-300/95 to-transparent">
                <p className="label-text text-beige-200/60 text-[10px] mb-1">
                  {projects[selected].category} · {projects[selected].year}
                </p>
                <h3 className="font-serif text-xl text-cream-100">{projects[selected].title}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-dark-300/80 flex items-center justify-center text-cream-200 hover:bg-dark-300 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
