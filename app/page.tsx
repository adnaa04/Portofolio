'use client'

import { motion, useMotionValue, useSpring, useTransform, useAnimation, Variants, type Transition } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import SectionHeader from '@/components/SectionHeader'

// ── Konfigurasi Spring Physics ─────────────────────────────
const SPRING_SOFT: Transition = { type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }
const SPRING_BOUNCE: Transition = { type: 'spring', stiffness: 400, damping: 15, mass: 0.5 }
const SPRING_SMOOTH: Transition = { type: 'spring', stiffness: 120, damping: 25, restDelta: 0.001 }

// ── Variants Animasi Reusable ─────────────────────────────
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
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  }
}

const itemSlideIn = (direction: 'left' | 'right' = 'left'): Variants => ({
  hidden: { opacity: 0, x: direction === 'left' ? -40 : 40, scale: 0.98 },
  show: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 20 }
  }
})

const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
}

// ── Custom Hook: Mouse Parallax ─────────────────────────────
function useMouseParallax(strength = 20) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * strength,
        y: (e.clientY / innerHeight - 0.5) * strength
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [strength])
  
  return mousePos
}

// ── Component: Magnetic Button ─────────────────────────────
function MagneticButton({ children, href, className = '', style = {} }: any) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    x.set(distanceX * 0.3)
    y.set(distanceY * 0.3)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div 
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        ref={ref}
        href={href}
        className={className}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    </motion.div>
  )
}

// ── Component: Tilt Card (Photo) ─────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXValue = ((e.clientY - centerY) / rect.height) * -8
    const rotateYValue = ((e.clientX - centerX) / rect.width) * 8
    
    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
    scale.set(1.02)
  }
  
  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ 
        rotateX, 
        rotateY, 
        scale,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

// ── Data ─────────────────────────────
const stats = [
  { number: '1+', label: 'Tahun\nPengalaman', icon: '💻' },
  { number: '2', label: 'Project\nSelesai', icon: '🚀' },
  { number: '2', label: 'Klien\nPuas', icon: '🤝' },
]

const latestProjects = [
  {
    number: '01',
    title: 'Peta Bencana Sriharjo',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    href: '/projects',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    number: '02',
    title: 'Diskusi Ilmu',
    tech: ['JavaScript', 'Tailwind CSS'],
    href: '/projects',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  
]

const latestExp = {
  role: 'Frontend Developer',
  company: 'Universitas Ahmad Dahlan',
  period: 'Jan 2024 – Sekarang',
}

// ── Main Component ─────────────────────────────
export default function Home() {
  const mousePos = useMouseParallax(15)
  const controls = useAnimation()
  
  // Trigger animation on mount
  useEffect(() => {
    controls.start('show')
  }, [controls])

  return (
    <div className="relative min-h-screen bg-[#0f0f11] text-white overflow-x-hidden">
      
      {/* ✨ Animated Background Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ 
            background: 'radial-gradient(circle, #F5C518 0%, transparent 70%)',
            x: useTransform(() => mousePos.x * 2),
            y: useTransform(() => mousePos.y * 2),
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-0 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ 
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
            x: useTransform(() => -mousePos.x * 1.5),
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ 
            background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
            y: useTransform(() => -mousePos.y * 1.5),
          }}
        />
      </div>

      {/* ✨ Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-0 z-10">
        <div className="max-w-6xl mx-auto px-6 w-full">
          
          {/* Badge with pulse animation */}
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ 
              background: 'rgba(245, 197, 24, 0.1)',
              border: '1px solid rgba(245, 197, 24, 0.3)'
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#F5C518]"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F5C518]">
              Frontend Development
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20">
            
            {/* ✨ Nama dengan Text Reveal Animation */}
            <motion.div 
              className="flex-1"
              variants={containerStagger}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                variants={textReveal}
                className="font-black uppercase leading-none text-white"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', lineHeight: 0.9 }}
              >
                <span className="block">NAUFAL</span>
                <motion.span 
                  className="block text-transparent bg-clip-text"
                  style={{ 
                    background: 'linear-gradient(135deg, #F5C518 0%, #F59E0B 50%, #D97706 100%)',
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  ADNA
                </motion.span>
                <span className="block">GARIBALDI</span>
              </motion.h1>

              

              {/*  Magnetic Buttons */}
             
            </motion.div>

            {/* ✨ Photo Card dengan Tilt Effect + Floating Animation */}
            <motion.div
              className="w-full lg:w-72 xl:w-80 flex-shrink-0"
              variants={itemSlideIn('right')}
              initial="hidden"
              animate="show"
            >
              <TiltCard className="relative">
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full"
                  style={{ aspectRatio: '3/4' }}
                >
                  {/* Card Container */}
                  <div
                    className="relative w-full h-full overflow-hidden rounded-2xl"
                    style={{
                      border: '1px solid rgba(255,255,255,0.15)',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                      boxShadow: `
                        0 32px 80px rgba(0,0,0,0.7),
                        0 0 0 1px rgba(255,255,255,0.1) inset,
                        0 0 60px rgba(245, 197, 24, 0.15)
                      `,
                    }}
                  >
                    {/* Image */}
                    <Image 
                      src="/foto-profil.jpg" 
                      alt="Naufal Adna" 
                      fill 
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      priority 
                    />
                    
                    {/* ✨ Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* ✨ Glossy Shine Effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)',
                      }}
                      animate={{ 
                        backgroundPosition: ['0% 0%', '100% 100%'] 
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    {/* ✨ Floating Badge */}
                  </div>
                  
                  {/*  Decorative Corner Elements */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-[#F5C518]/50 rounded-tr-xl" />
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-[#F5C518]/50 rounded-bl-xl" />
                </motion.div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/*  Animated Marquee Divider */}
        <motion.div 
          className="mt-20 w-full overflow-hidden py-5"
          style={{ 
            borderTop: '1px solid rgba(235, 227, 227, 0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(90deg, transparent, rgba(245,197,24,0.05), transparent)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-1 pr-8">
                {['FRONTEND', 'NEXT.JS', 'REACT', 'JAVASCRIPT', 'TAILWIND', 'PYTHON', 'APP MOBILE'].map((item, i) => (
                  <span key={`${setIndex}-${i}`} className="flex items-center gap-4">
                    <span className={`text-xs font-bold uppercase tracking-widest ${i % 2 === 0 ? 'text-white/50' : 'text-white/30'}`}>
                      {item}
                    </span>
                    <motion.span 
                      className="text-[#F5C518]"
                      animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
                    >
                      ◆
                    </motion.span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TENTANG SAYA */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader 
            subtitle="Tentang" 
            title="Siapa Saya?" 
            href="/about" 
            linkLabel="Selengkapnya" 
          />

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <motion.p 
              className="text-sm text-white/60 leading-relaxed"
              variants={itemFadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Mahasiswa Sistem Informasi{' '}
              <span className="text-white font-semibold bg-gradient-to-r from-[#F5C518] to-[#F59E0B] bg-clip-text text-transparent">
                Universitas Ahmad Dahlan
              </span>{' '}
              yang berfokus pada pengembangan antarmuka web modern menggunakan{' '}
              <span className="text-white/90">HTML, CSS, JavaScript, Python, Node.js, SQL</span>{' '}
              dan berbagai teknologi frontend terkini untuk menciptakan pengalaman digital yang memukau.
            </motion.p>

            {/* ✨ Stats Cards dengan Hover Glow */}
            <motion.div 
              className="grid grid-cols-3 gap-4"
              variants={containerStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {stats.map(({ number, label, icon }, i) => (
                <motion.div
                  key={number}
                  variants={itemFadeUp}
                  className="group relative text-center p-5 rounded-2xl cursor-default overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(12px)',
                  }}
                  whileHover={{ 
                    y: -4,
                    borderColor: 'rgba(245, 197, 24, 0.5)',
                    boxShadow: '0 20px 40px rgba(245, 197, 24, 0.15)'
                  }}
                  transition={SPRING_SOFT}
                >
                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(245, 197, 24, 0.15) 0%, transparent 70%)'
                    }}
                  />
                  
                  <motion.span 
                    className="text-2xl block mb-2"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  >
                    {icon}
                  </motion.span>
                  <p className="text-3xl font-black text-[#F5C518]">{number}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wide mt-1.5 whitespace-pre-line leading-relaxed">
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PENGALAMAN */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader 
            subtitle="Karir" 
            title="Pengalaman" 
            href="/experience" 
            linkLabel="Selengkapnya" 
          />

          {/* ✨ Experience Card dengan Animated Border */}
          <motion.div
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group relative p-6 md:p-8 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)',
            }}
            whileHover={{ y: -2 }}
            transition={SPRING_SOFT}
          >
            {/* Animated Border Gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                padding: '1px',
                background: 'linear-gradient(45deg, #F5C518, #F59E0B, #D97706, #F5C518)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <motion.div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                  style={{ 
                    background: 'rgba(245, 197, 24, 0.15)',
                    border: '1px solid rgba(245, 197, 24, 0.4)'
                  }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#F5C518]"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F5C518]">Aktif</span>
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{latestExp.role}</h3>
                <p className="text-sm text-white/50 mt-1">{latestExp.company}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xs text-white/30 uppercase tracking-widest">{latestExp.period}</p>
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(245, 197, 24, 0.1)', border: '1px solid rgba(245, 197, 24, 0.3)' }}
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={SPRING_BOUNCE}
                >
                  <span className="text-[#F5C518]">→</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PROYEK */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader 
            subtitle="Portofolio" 
            title="Proyek Terbaru" 
            href="/projects" 
            linkLabel="Lihat Semua" 
          />

          <motion.div 
            className="space-y-2"
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {latestProjects.map((proj, i) => (
              <motion.div 
                key={proj.number} 
                variants={itemFadeUp}
                whileHover={{ x: 8 }}
                transition={SPRING_SOFT}
              >
                <Link
                  href={proj.href}
                  className="group relative flex items-start gap-6 py-6 px-4 rounded-xl transition-all duration-300"
                  style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Hover Background */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${proj.gradient}`}
                    style={{ zIndex: 0 }}
                  />
                  
                  <span className="text-sm font-black flex-shrink-0 mt-1 text-[#F5C518] z-10">{proj.number}</span>
                  <div className="flex-1 z-10">
                    <p className="text-lg font-bold text-white group-hover:text-[#F5C518] transition-colors duration-300">
                      {proj.title}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proj.tech.map(t => (
                        <motion.span 
                          key={t} 
                          className="px-2.5 py-1 text-xs text-white/50 uppercase tracking-wide rounded-md"
                          style={{ background: 'rgba(255,255,255,0.05)' }}
                          whileHover={{ 
                            background: 'rgba(245, 197, 24, 0.2)',
                            color: '#F5C518',
                            scale: 1.05
                          }}
                          transition={SPRING_BOUNCE}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <motion.span 
                    className="text-white/30 group-hover:text-[#F5C518] group-hover:translate-x-2 transition-all duration-300 mt-1 z-10 text-xl"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↗
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* KONTAK CTA */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative py-24 z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p 
            className="text-xs font-semibold uppercase tracking-widest mb-5 text-[#F5C518]" 
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
          
          </motion.p>
          
          <motion.h2 
            className="text-4xl md:text-7xl font-black uppercase leading-tight text-white mb-6"
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.span variants={textReveal}>Ayo Mulai</motion.span>
            <br />
            <motion.span 
              variants={textReveal}
              className="text-transparent bg-clip-text"
              style={{ 
                background: 'linear-gradient(135deg, #F5C518 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
              }}
            >
              Kolaborasi!
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-sm text-white/50 max-w-lg mx-auto leading-relaxed mb-12"
            variants={itemFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Saya terbuka untuk kesempatan kerja full-time, freelance, atau proyek kolaborasi menarik. 
            Mari ciptakan sesuatu yang luar biasa bersama! 
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={containerStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <MagneticButton
              href="/contact"
              className="relative px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wide overflow-hidden group"
              style={{ 
                borderColor: '#F5C518', 
                color: '#F5C518',
                background: 'rgba(245, 197, 24, 0.1)',
                border: '2px solid #F5C518'
              }}
            >
              <span className="relative z-10">Hubungi Saya ↗</span>
              <motion.span
                className="absolute inset-0 bg-[#F5C518]"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative z-10 group-hover:text-black transition-colors">Hubungi Saya ↗</span>
            </MagneticButton>
            
            <MagneticButton
              href="mailto:rayhanaldi82@gmail.com"
              className="relative px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wide overflow-hidden group border border-white/20 text-white/90 hover:text-black"
            >
              <span className="relative z-10">rayhanaldi82@gmail.com</span>
              <motion.span
                className="absolute inset-0 bg-white"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ✨ Footer dengan Animated Social Links */}
      <footer className="relative py-8 border-t border-white/10 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p 
              className="text-xs text-white/30 uppercase tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © 2024 Naufal Adna Garibaldi
            </motion.p>
            
            {/* ✨ Social Icons dengan Hover Effect */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {['GitHub', 'LinkedIn', 'Twitter'].map((social, i) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-xs text-white/40 hover:text-[#F5C518] uppercase tracking-wide transition-colors relative pb-1"
                  whileHover={{ y: -2 }}
                  transition={SPRING_BOUNCE}
                >
                  {social}
                  <motion.span
                    className="absolute bottom-0 left-0 h-px bg-[#F5C518]"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
            
            <motion.p 
              className="text-xs text-white/30 uppercase tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Built with <span className="text-[#F5C518]">Next.js</span> + <span className="text-[#F5C518]">Framer Motion</span> ✨
            </motion.p>
          </div>
        </div>
      </footer>

      {/* Custom Cursor (Optional - Uncomment if desired) */}
      {/* 
      <motion.div
        className="fixed w-4 h-4 rounded-full border-2 border-[#F5C518] pointer-events-none z-50 mix-blend-difference"
        animate={{ 
          x: mousePos.x * 2, 
          y: mousePos.y * 2,
          scale: [1, 1.2, 1]
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      */}
    </div>
  )
}