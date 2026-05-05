import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/components/SectionWrapper'
import { Linkedin, Instagram } from '@/components/SocialIcons'

const team = [
  {
    name: 'Aryan Verma',
    role: 'Principal Architect & Founder',
    bio: 'With 12+ years shaping iconic spaces, Aryan leads Archsphere\'s design philosophy — merging structural integrity with poetic form.',
    initials: 'AV',
    color: 'bg-brown-400',
  },
  {
    name: 'Priya Mehta',
    role: 'Head of Interior Design',
    bio: 'Priya transforms bare spaces into sensory experiences, curating materials, light, and texture with an instinctive eye for harmony.',
    initials: 'PM',
    color: 'bg-olive-300',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Senior Design Architect',
    bio: 'Rohan leads commercial and urban projects with a focus on sustainability, community, and buildings that enrich their context.',
    initials: 'RK',
    color: 'bg-brown-500',
  },
  
]

export function Team() {
  return (
    <section id="team" className="py-24 md:py-32 bg-cream-200 overflow-hidden">
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
            <span className="label-text text-brown-400 text-[10px]">The People</span>
          </div>
          <h2 className="heading-lg text-dark-300">
            Meet the <span className="italic text-brown-400">Team</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              className="group bg-cream-100 rounded-sm border border-beige-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-400"
            >
              {/* Avatar */}
              <div className={`${member.color} h-56 flex items-end justify-end p-5`}>
                <span className="font-serif text-7xl font-semibold text-white/20 leading-none select-none">
                  {member.initials}
                </span>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-dark-300 mb-0.5">{member.name}</h3>
                <p className="label-text text-[10px] text-brown-400 mb-3">{member.role}</p>
                <p className="text-dark-200/60 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  <button className="w-8 h-8 rounded-sm border border-beige-200 flex items-center justify-center text-olive-300 hover:bg-brown-400 hover:text-cream-100 hover:border-brown-400 transition-all">
                    <Linkedin size={13} />
                  </button>
                  <button className="w-8 h-8 rounded-sm border border-beige-200 flex items-center justify-center text-olive-300 hover:bg-brown-400 hover:text-cream-100 hover:border-brown-400 transition-all">
                    <Instagram size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
