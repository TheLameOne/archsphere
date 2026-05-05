import { CursorEffect } from '@/components/CursorEffect'
import { Navbar }       from '@/sections/Navbar'
import { Hero }         from '@/sections/Hero'
import { Stats }        from '@/sections/Stats'
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
  return (
    <>
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

