'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

interface SectionHeaderProps {
  subtitle: string
  title: string
  href?: string
  linkLabel?: string
}

const containerStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
}

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 22 }
  }
}

export default function SectionHeader({ subtitle, title, href, linkLabel = 'Selengkapnya' }: SectionHeaderProps) {
  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
      variants={containerStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div variants={itemFadeUp}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[#F5C518]">{subtitle}</p>
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white">{title}</h2>
      </motion.div>
      
      {href && (
        <motion.div variants={itemFadeUp}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href={href} 
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-[#F5C518] transition-colors pb-1 border-b border-white/20 hover:border-[#F5C518]"
            >
              {linkLabel} 
              <motion.span 
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↗
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
