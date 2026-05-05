import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/SocialIcons'

const navLinks = [
  { label: 'About',       to: 'about' },
  { label: 'Services',    to: 'services' },
  { label: 'Portfolio',   to: 'portfolio' },
  { label: 'Process',     to: 'process' },
  { label: 'Team',        to: 'team' },
  { label: 'Contact',     to: 'contact' },
]

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream-100/95 backdrop-blur-md shadow-sm border-b border-beige-100'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide section-padding">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="hero" smooth duration={800} className="flex items-center group">
              <Logo light={!scrolled} />
            </Link>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={800}
                    offset={-80}
                    className={`label-text transition-colors duration-300 hover:text-brown-400 ${
                      scrolled ? 'text-dark-200' : 'text-cream-200/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex">
              <Link
                to="contact"
                smooth
                duration={800}
                offset={-80}
                className={`label-text px-5 py-2.5 rounded-sm border transition-all duration-300 hover:bg-brown-400 hover:text-cream-100 hover:border-brown-400 ${
                  scrolled
                    ? 'border-brown-400 text-brown-400'
                    : 'border-cream-200/60 text-cream-100'
                }`}
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                scrolled ? 'text-dark-300' : 'text-cream-100'
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark-300/98 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={link.to}
                  smooth
                  duration={800}
                  offset={-80}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-3xl text-cream-200 hover:text-brown-300 transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="contact"
                smooth
                duration={800}
                onClick={() => setMenuOpen(false)}
                className="mt-4 label-text px-8 py-3 border border-brown-300 text-brown-300 hover:bg-brown-400 hover:text-cream-100 transition-all rounded-sm"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
