import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/components/SectionWrapper'
// import teamPhoto1 from '@/assets/team/image1.webp'
// import teamPhoto2 from '@/assets/team/image2.jpeg'
// import teamPhoto3 from '@/assets/team/image3.jpeg'

import teamPhoto1 from '@/assets/team/image12.png'
import teamPhoto3 from '@/assets/team/image32.png'

type Leader = { name: string; role: string; bio: string; photo: string }
type Member = { name: string; role: string; bio: string; initials: string; color: string }

const leaders: Leader[] = [
  {
    name: 'Himanshu K Prajapati',
    role: 'PROJECT HEAD',
    bio: 'As the Project head, I am managing the project lifecycle end-to-end, business development, facilitate client meetings to align scope and milestones, coordinate the project team to resolve dependencies, and ensure all deliverables are produced to agreed quality standards and timelines.',
    photo: teamPhoto1,
  },
  {
    name: 'Divya Verma',
    role: 'OPERATIONS HEAD',
    bio: 'Focusing on overall internal operations and business development, finance management, while coordinating and managing internal teams to ensure seamless execution of the project.',
    photo: teamPhoto3,
  },
]

const members: Member[] = [
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
    color: 'bg-olive-400',
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

        {/* Leadership */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {leaders.map((leader) => (
            <motion.article
              key={leader.name}
              variants={staggerItem}
              className="group flex flex-col sm:flex-row bg-cream-100 border border-beige-100 rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-500"
            >
              <div className="relative h-80 sm:h-auto sm:min-h-[340px] sm:w-[42%] shrink-0 overflow-hidden bg-beige-200">
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: 'center 15%' }}
                />
              </div>

              <div className="flex flex-col p-7 lg:p-8">
                <p className="label-text text-[10px] text-brown-400">{leader.role}</p>
                <h3 className="font-serif text-2xl lg:text-[1.65rem] text-dark-300 mt-2 leading-snug">
                  {leader.name}
                </h3>
                <div className="w-10 h-px bg-brown-400/40 my-5 transition-all duration-500 group-hover:w-16 group-hover:bg-brown-400" />
                <p className="text-dark-200/65 text-sm leading-relaxed">{leader.bio}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Core team */}
        <div className="mt-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-beige-100 border border-beige-100 rounded-sm overflow-hidden"
          >
            {members.map((member) => (
              <motion.article
                key={member.name}
                variants={staggerItem}
                className="group bg-cream-100 p-7 hover:bg-cream-50 transition-colors duration-500"
              >
                <span
                  className={`${member.color} w-12 h-12 rounded-full flex items-center justify-center font-serif text-sm tracking-wide text-cream-100 transition-transform duration-500 group-hover:scale-110`}
                  aria-hidden="true"
                >
                  {member.initials}
                </span>
                <h3 className="font-serif text-xl text-dark-300 mt-6 leading-snug">{member.name}</h3>
                <p className="label-text text-[10px] text-brown-400 mt-1.5">{member.role}</p>
                <p className="text-dark-200/60 text-sm leading-relaxed mt-4">{member.bio}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
