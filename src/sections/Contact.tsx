import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { SectionWrapper } from '@/components/SectionWrapper'

const contactInfo = [
  { icon: Mail,    label: 'Email',    value: 'hello@archsphere.in' },
  { icon: Phone,   label: 'Phone',   value: '+91 98765 43210' },
  { icon: MapPin,  label: 'Studio',  value: 'New Delhi, India' },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project Enquiry from ${form.name}`)
    const body    = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:hello@archsphere.in?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-cream-200 overflow-hidden">
      <div className="container-wide section-padding">

        <SectionWrapper className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-brown-400" />
            <span className="label-text text-brown-400 text-[10px]">Start a Project</span>
          </div>
          <h2 className="heading-lg text-dark-300">
            Let's <span className="italic text-brown-400">Create</span> Together
          </h2>
        </SectionWrapper>

        <div className="grid md:grid-cols-[1fr_1.8fr] gap-14 lg:gap-20">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-dark-200/60 text-sm leading-relaxed mb-10">
              Whether you have a site, a brief, or just an idea — we'd love to hear from you.
              Fill in the form and we'll be in touch within 24 hours.
            </p>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-brown-400/10 border border-brown-400/20 flex items-center justify-center flex-none">
                    <Icon size={15} className="text-brown-400" />
                  </div>
                  <div>
                    <p className="label-text text-[10px] text-olive-300 mb-0.5">{label}</p>
                    <p className="text-dark-200 text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-brown-400/10 border border-brown-400/30 flex items-center justify-center mb-5">
                  <Send size={20} className="text-brown-400" />
                </div>
                <h3 className="font-serif text-2xl text-dark-300 mb-2">Message Sent!</h3>
                <p className="text-dark-200/60 text-sm">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-text text-[10px] text-olive-300 block mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Aryan Verma"
                      className="w-full px-4 py-3 bg-cream-100 border border-beige-200 rounded-sm text-dark-300 text-sm placeholder-beige-300 focus:outline-none focus:border-brown-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="label-text text-[10px] text-olive-300 block mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-cream-100 border border-beige-200 rounded-sm text-dark-300 text-sm placeholder-beige-300 focus:outline-none focus:border-brown-400 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-text text-[10px] text-olive-300 block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-cream-100 border border-beige-200 rounded-sm text-dark-300 text-sm placeholder-beige-300 focus:outline-none focus:border-brown-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="label-text text-[10px] text-olive-300 block mb-2">Service Needed</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-100 border border-beige-200 rounded-sm text-dark-300 text-sm focus:outline-none focus:border-brown-400 transition-colors appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option>Residential Architecture</option>
                      <option>Commercial Architecture</option>
                      <option>Interior Design</option>
                      <option>3D Visualization</option>
                      <option>Urban Planning</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label-text text-[10px] text-olive-300 block mb-2">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project, site, timeline, and vision..."
                    className="w-full px-4 py-3 bg-cream-100 border border-beige-200 rounded-sm text-dark-300 text-sm placeholder-beige-300 focus:outline-none focus:border-brown-400 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-3.5 bg-brown-400 hover:bg-brown-500 text-cream-100 label-text rounded-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={13} />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
