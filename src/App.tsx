import { motion, useScroll, useSpring } from 'framer-motion'
import { CursorEffect } from '@/components/CursorEffect'
import { PageIntro } from '@/components/PageIntro'
import { Navbar }       from '@/sections/Navbar'
import { Hero }         from '@/sections/Hero'
// import { Stats }        from '@/sections/Stats'
import { About }        from '@/sections/About'
import { Services }     from '@/sections/Services'
import { Portfolio }    from '@/sections/Portfolio'
import { Process }      from '@/sections/Process'
import { Team }         from '@/sections/Team'
import { Testimonials } from '@/sections/Testimonials'
import { FAQ }          from '@/sections/FAQ'
import { Contact }      from '@/sections/Contact'
import { Footer }       from '@/sections/Footer'

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <>
      <PageIntro />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brown-400 z-[9997] origin-left"
        style={{ scaleX }}
      />
      <CursorEffect />
      <Navbar />
      <main>
        <Hero />
        {/* <Stats /> */}
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App

