import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { Instagram, Linkedin, Twitter, Logo } from '@/components/SocialIcons'

const footerLinks = {
  'Studio': ['About Us', 'Our Process', 'Team', 'Careers'],
  'Services': ['Residential', 'Commercial', 'Interior Design', '3D Visualization', 'Urban Planning'],
  'Connect': ['Portfolio', 'Testimonials', 'FAQ', 'Contact'],
}

const navAnchors: Record<string, string> = {
  'About Us':       'about',
  'Our Process':    'process',
  'Team':           'team',
  'Careers':        'contact',
  'Residential':    'services',
  'Commercial':     'services',
  'Interior Design':'services',
  '3D Visualization':'services',
  'Urban Planning': 'services',
  'Portfolio':      'portfolio',
  'Testimonials':   'testimonials',
  'FAQ':            'faq',
  'Contact':        'contact',
}

export function Footer() {
  return (
    <footer className="bg-dark-400 text-cream-200">

      {/* CTA Band */}
      <div className="bg-brown-500 py-14 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-4">
            Ready to Build Something <span className="italic">Remarkable</span>?
          </h2>
          <p className="text-beige-100/60 mb-7 text-sm">
            Start a conversation — the best projects begin with a single question.
          </p>
          <Link
            to="contact"
            smooth
            duration={800}
            className="inline-block px-8 py-3.5 bg-cream-100 text-brown-500 label-text rounded-sm hover:bg-beige-200 transition-colors"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container-wide section-padding py-16">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <Logo light={true} className="items-start" />
            </div>
            <p className="text-beige-200/40 text-sm leading-relaxed max-w-xs mb-6">
              A premier architecture & interior design studio crafting spaces
              that inspire, endure, and transcend expectation.
            </p>
            <div className="flex gap-3">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-beige-200/50 hover:bg-brown-400 hover:text-cream-100 hover:border-brown-400 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="label-text text-[10px] text-brown-300 mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={navAnchors[link] || 'hero'}
                      smooth
                      duration={800}
                      offset={-80}
                      className="text-beige-200/40 text-sm hover:text-beige-200 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="earthy-divider mb-6" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-beige-200/25 text-xs">
            © {new Date().getFullYear()} Archsphere Studio. All rights reserved.
          </p>
          <p className="text-beige-200/25 text-xs">
            Designing Spaces That Transcend
          </p>
        </div>
      </div>

    </footer>
  )
}
