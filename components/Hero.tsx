'use client'

import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, MouseEvent } from 'react'

const NAME_LINES = ['NAUFAL', 'ADNA', 'GARIBALDI']
const SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1]

/* ── Variants ─────────────────────────────────────── */
const lineContainer: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.045, delayChildren: delay },
  }),
}

const charVariant: Variants = {
  hidden: { y: '115%', opacity: 0, rotateX: -40 },
  visible: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.75, ease: SPRING },
  },
}

/* ── Animated Name ───────────────────────────────── */
function AnimatedName() {
  return (
    <h1
      className="font-black uppercase leading-none tracking-tight text-white"
      style={{ fontSize: 'clamp(2.8rem, 10vw, 6.5rem)', lineHeight: 0.92, perspective: '600px' }}
    >
      {NAME_LINES.map((line, lineIndex) => (
        <div key={line} className="overflow-hidden">
          <motion.span
            className="flex"
            custom={0.3 + lineIndex * 0.2}
            variants={lineContainer}
            initial="hidden"
            animate="visible"
          >
            {line.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={charVariant}
                className="inline-block"
                style={{ transformOrigin: 'bottom center' }}
                whileHover={{
                  y: -6,
                  color: '#F5C518',
                  transition: { duration: 0.15 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </div>
      ))}
    </h1>
  )
}

/* ── Glossy Photo Card ───────────────────────────── */
function GlossyCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 })
  const glowX = useTransform(rawX, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(rawY, [-0.5, 0.5], ['0%', '100%'])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.8)
    rawY.set((e.clientY - rect.top) / rect.height - 0.8)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      className="w-full lg:w-72 xl:w-80 flex-shrink-0"
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: SPRING }}
    >
      {/* floating wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* 3D tilt wrapper */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            perspective: '800px',
          }}
          className="relative w-full cursor-pointer"
        >
          {/* Card */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: '3/4',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: `
                0 30px 80px rgba(0,0,0,0.7),
                0 0 0 1px rgba(255,255,255,0.05) inset,
                0 1px 0 rgba(255,255,255,0.15) inset
              `,
            }}
          >
            {/* Foto */}
            <Image
              src="/foto-profil.jpg"
              alt="Foto Naufal Adna Garibaldi"
              fill
              className="object-cover object-top"
              priority
            />

            {/* Glossy top shine — refraksi cahaya atas */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 45%)',
                borderRadius: '20px',
              }}
            />

            {/* Dynamic glare yang ikut mouse */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: useTransform(
                  [glowX, glowY],
                  ([x, y]) =>
                    `radial-gradient(circle at ${(x as string)} ${(y as string)}, rgba(255,255,255,0.12) 0%, transparent 60%)`
                ),
                borderRadius: '20px',
              }}
            />

            {/* Bottom gradient overlay */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '55%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                borderRadius: '0 0 20px 20px',
              }}
            />

            {/* Border glow kuning saat hover */}
            <motion.div
              className="absolute inset-0 rounded-[20px] pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                boxShadow: '0 0 0 1.5px rgba(245,197,24,0.4), 0 0 30px rgba(245,197,24,0.1)',
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Status indicator */}
     </motion.div>
    
  )
}

/* ── Main Hero ───────────────────────────────────── */
const roles = ['FRONTEND DEVELOPMENT']
const marqueeItems = [...roles, ...roles, ...roles, ...roles]

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ background: '#000000' }}
    >
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-12 w-full">
        {/* Label */}
        <motion.p
          className="text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ color: '#F5C518' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Frontend Development
        </motion.p>

        {/* 2-column */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16">
          {/* Kiri */}
          <div className="flex-1">
            <AnimatedName />

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
            >
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(245,197,24,0.25)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/contact"
                  className="btn-outline"
                  style={{ borderColor: '#F5C518', color: '#F5C518' }}
                >
                  Contact Saya ↗
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/projects" className="btn-outline">
                  Lihat Proyek
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Kanan: card glossy */}
          <GlossyCard />
        </div>
      </div>

      {/* Email bar */}
      <motion.div
        className="w-full py-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <p
          className="text-center text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
        </p>
      </motion.div>

      {/* Marquee */}
      <motion.div
        className="w-full overflow-hidden py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="text-xs font-bold uppercase tracking-widest px-10 whitespace-nowrap"
              style={{
                color: i % 2 === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
              }}
            >
              {item}
              <span style={{ color: '#F5C518', marginLeft: '2.5rem' }}>◆</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}