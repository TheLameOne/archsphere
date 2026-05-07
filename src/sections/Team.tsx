import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/components/SectionWrapper'
import teamPhoto1 from '@/assets/team/image1.webp'
import teamPhoto2 from '@/assets/team/image2.jpeg'
import teamPhoto3 from '@/assets/team/image3.jpeg'

// import teamPhoto1 from '@/assets/team/image11.png'
// import teamPhoto2 from '@/assets/team/image21.png'
// import teamPhoto3 from '@/assets/team/image31.png'

const team: Array<{ name: string; role: string; bio: string; photo?: string; initials: string; color: string }> = [
  {
    name: 'Himanshu K Prajapati',
    role: 'PROJECT HEAD',
    bio: 'As the Project head, I am managing the project lifecycle end-to-end, business development, facilitate client meetings to align scope and milestones, coordinate the project team to resolve dependencies, and ensure all deliverables are produced to agreed quality standards and timelines.',
    photo: teamPhoto1,
    initials: 'HKP',
    color: 'bg-brown-400',
  },
  {
    name: 'Raksha Sharma',
    role: 'DESIGN STRATEGY HEAD',
    bio: "As Principal Architect and Design Head, I curate the project's holistic design framework, leads coordination across disciplines, oversee the review and convergence of all drawings, and guides the team to ensure cohesive, compliant, and timely design.",
    photo: teamPhoto2,
    initials: 'RS',
    color: 'bg-olive-300',
  },
  {
    name: 'Divya Verma',
    role: 'OPERATIONS HEAD',
    bio: 'Focusing on overall internal operations and business development, finance management, while coordinating and managing internal teams to ensure seamless execution of the project.',
    photo: teamPhoto3,
    initials: 'DV',
    color: 'bg-brown-500',
  },
  {
    name: 'Hardik Mori',
    role: 'BILLING ENGINEER',
    bio: 'Verify and certify bills; develop the Bar Bending Schedule (BBS) for the project; cross-check site execution measurements and raise bills based on verified quantities.',
    initials: 'HM',
    color: 'bg-brown-400',
  },
  {
    name: 'Raj Vachheta',
    role: 'PROJECT PLANNER',
    bio: 'Prepare and manage the project schedule in Microsoft Project (MSP); track and monitor progress to prevent delays and conflicts in construction activities.',
    initials: 'RV',
    color: 'bg-olive-300',
  },
  {
    name: 'Varun Desai',
    role: 'HORTICULTURIST',
    bio: 'Manage the supply and installation of nursery items — including irrigation systems, horticulture items — and prepare detailed specifications for all nursery products.',
    initials: 'VD',
    color: 'bg-brown-500',
  },
  {
    name: 'Anjali Patel',
    role: 'ARCHITECT',
    bio: 'Develops design concepts, prepares and refines architectural drawings, executes technical detailing, and coordinates with consultants to maintain clarity, precision, and consistency across all project documents.',
    initials: 'AP',
    color: 'bg-brown-400',
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
              {member.photo && (
              <div className="h-80 overflow-hidden bg-beige-200">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: 'center 10%' }}
                  />
              </div>
              )}

              {/* Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-dark-300 mb-0.5">{member.name}</h3>
                {member.role && (
                  <p className="label-text text-[10px] text-brown-400 mb-3">{member.role}</p>
                )}
                <p className="text-dark-200/60 text-sm leading-relaxed mb-4">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
