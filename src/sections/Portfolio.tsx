import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import img1  from '@/assets/residential/elevation/3d_render/Designer (1).png'
import img2  from '@/assets/residential/interior/07c67703-39a2-4450-a4ef-d03abef16fb2.png'
import img3  from '@/assets/residential/elevation/3d_render/Designer (2).png'
import img4  from '@/assets/residential/interior/dfdd8db7-b18f-492f-88dc-181f300e3cf5.png'
import img5  from '@/assets/residential/elevation/3d_render/adc697ad-4700-43c8-9192-cd540aa346ea.png'
import img6  from '@/assets/residential/interior/9359427b-46ca-49d4-9c9f-9a21f4730055.png'
import img7  from '@/assets/residential/elevation/3d_render/eaaddf4f-7cf3-41bc-bfe7-3390fdc532bf.png'
import img8  from '@/assets/residential/elevation/3d_render/433b3a93-5d21-4a71-a0f7-ccadb6c8b0ac(1).png'
import img9  from '@/assets/residential/interior/c6f59bf1-ad8f-41f8-842e-12ec4d508291.png'
import img10 from '@/assets/residential/elevation/3d_render/1777136947755(1).png'
import img11 from '@/assets/residential/elevation/3d_render/63ae7d8e-a87d-445a-8f77-b3f402d0050d.png'
import img12 from '@/assets/residential/interior/373780d1-99b4-4479-95a2-dc884febe110.png'
import sketch1 from '@/assets/residential/elevation/sketchup/1777196207170.png'
import sketch2 from '@/assets/residential/elevation/sketchup/SAVE_20260205_093545.jpg'
import sketch3 from '@/assets/residential/elevation/sketchup/SAVE_20260205_095143.jpg'
import sketch4 from '@/assets/residential/elevation/sketchup/WA_1777139722953.jpeg'

type Category = 'All' | 'Residential Architecture' | 'Interior Design' | '3D Visualization'

const TABS: Category[] = ['All', 'Residential Architecture', 'Interior Design', '3D Visualization']

const projects: Array<{ img: string; title: string; category: Exclude<Category, 'All'>; year: string }> = [
  { img: img1,  title: 'The Kessler Residence',  category: '3D Visualization',         year: '2024' },
  { img: img2,  title: 'Solara Living',           category: 'Interior Design',          year: '2024' },
  { img: img3,  title: 'Hillcrest Manor',         category: '3D Visualization',         year: '2024' },
  { img: img4,  title: 'The Lumière Apartment',   category: 'Interior Design',          year: '2023' },
  { img: img5,  title: 'Serenity Estate',         category: '3D Visualization',         year: '2023' },
  { img: img6,  title: 'Oak & Stone Residence',   category: 'Interior Design',          year: '2023' },
  { img: img7,  title: 'Skyline Penthouse',       category: '3D Visualization',         year: '2023' },
  { img: img8,  title: 'Vantage Point Villa',     category: '3D Visualization',         year: '2022' },
  { img: img9,  title: 'Riviera Suite',           category: 'Interior Design',          year: '2022' },
  { img: img10, title: 'The Loft Collection',     category: '3D Visualization',         year: '2022' },
  { img: img11, title: 'Meridian Spa & Wellness', category: '3D Visualization',         year: '2022' },
  { img: img12,   title: 'Sora Penthouse',             category: 'Interior Design',          year: '2021' },
  { img: sketch1,  title: 'Parkview Elevation Study',    category: 'Residential Architecture', year: '2024' },
  { img: sketch2,  title: 'Meridian Elevation Draft',     category: 'Residential Architecture', year: '2023' },
  { img: sketch3,  title: 'Sunridge Residence Plan',      category: 'Residential Architecture', year: '2023' },
  { img: sketch4,  title: 'Harborview Elevation Concept', category: 'Residential Architecture', year: '2022' },
]

export function Portfolio() {
  const [active,   setActive]   = useState<Category>('All')
  const [selected, setSelected] = useState<number | null>(null)

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-cream-300 overflow-hidden">
      <div className="container-wide section-padding">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-brown-400" />
            <span className="label-text text-brown-400 text-[10px]">Selected Work</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="heading-lg text-dark-300">
              Our <span className="italic text-brown-400">Portfolio</span>
            </h2>
            <p className="text-dark-200/50 text-sm max-w-xs leading-relaxed">
              {projects.length} projects across residential architecture, interior and 3D visualization.
            </p>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`label-text text-[10px] px-4 py-2 rounded-sm border transition-all duration-300 ${
                active === tab
                  ? 'bg-brown-400 border-brown-400 text-cream-100'
                  : 'border-beige-200 text-dark-200/60 hover:border-brown-400 hover:text-brown-400'
              }`}
            >
              {tab === 'All' ? `All (${projects.length})` : tab}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover="hover"
                className={`group relative overflow-hidden rounded-sm cursor-pointer ${
                  i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                }`}
                style={{ aspectRatio: i === 0 ? '3/4' : '4/3' }}
                onClick={() => setSelected(projects.indexOf(p))}
              >
                <motion.img
                  src={p.img}
                  alt={p.title}
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <motion.div
                  variants={{ hover: { opacity: 1 } }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 bg-gradient-to-t from-dark-300/90 via-dark-300/20 to-transparent"
                />

                {/* Zoom icon */}
                <motion.div
                  variants={{ hover: { opacity: 1, y: 0 } }}
                  initial={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-100/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <ZoomIn size={14} className="text-cream-100" />
                </motion.div>

                {/* Text overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <motion.p
                    variants={{ hover: { opacity: 1, y: 0 } }}
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="label-text text-beige-200/70 text-[10px]"
                  >
                    {p.category}
                  </motion.p>
                  <motion.h3
                    variants={{ hover: { opacity: 1, y: 0 } }}
                    initial={{ opacity: 0, y: 14 }}
                    transition={{ duration: 0.35, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-base text-cream-100 mt-0.5"
                  >
                    {p.title}
                  </motion.h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
            className="fixed inset-0 z-50 bg-dark-300/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' as const }}
              className="relative max-w-4xl w-full max-h-full overflow-hidden rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={projects[selected].img}
                alt={projects[selected].title}
                className="w-full object-contain max-h-[80vh]"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-dark-300/95 to-transparent">
                <p className="label-text text-beige-200/60 text-[10px]">
                  {projects[selected].category}
                </p>
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
