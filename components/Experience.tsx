'use client'

import { motion, useInView, AnimatePresence, Variants, Transition } from 'framer-motion'
import { useRef, useState } from 'react'

// Enhanced spring configuration for more lively animations
const SPRING: Transition = { type: 'spring', stiffness: 200, damping: 15 }
const BOUNCE_SPRING: Transition = { type: 'spring', stiffness: 400, damping: 20 }

interface Experience {
    company: string
    location: string
    role: string
    period: string
    current: boolean
    tags: string[]
    achievements: string[]
}

const experiences: Experience[] = [
    {
        company: 'BEM Berdampak',
        location: 'Yogyakarta',
        role: 'Frontend Developer',
        period: 'Okt – Des 2025',
        current: true,
        tags: ['Leaflet.js', 'Tailwind CSS', 'Python'],
        achievements: [
            'Membuat Peta Bencana Desa Sriharjo menggunakan Leaflet.js dan Tailwind CSS.',
            'Mengolah data penduduk dan pengelompokkan berdasarkan RT/RW dan Padukuhan menggunakan Python.',
            'Membuat sistem informasi desa untuk memudahkan akses informasi bagi masyarakat.',
        ],
    },
    {
        company: 'Mitra Edukasi SMA',
        location: 'Yogyakarta',
        role: 'Web Developer',
        period: 'Okt 2025 – Sekarang',
        current: false,
        tags: ['HTML', 'CSS', 'JavaScript'],
        achievements: [
            'Mengembangkan website pembelajaran yang menyediakan materi, tugas, dan informasi secara online.',
            'Platform berbasis web yang memudahkan siswa memperoleh informasi belajar di luar kelas.',
            'Menggunakan teknologi web seperti HTML, CSS, dan JavaScript.',
        ],
    },
]

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
}

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const cardVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 50,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const tagVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 15,
        },
    },
}

const achievementVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

/* ── Main Experience ─────────────────────────── */
export default function Experience() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section 
            id="experience" 
            className="min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-12" 
            style={{ background: 'linear-gradient(180deg, #0f0f11 0%, #16161a 100%)' }}
        >
            <motion.div 
                className="max-w-5xl mx-auto" 
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
            >

                {/* Section Title */}
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.1] sm:leading-tight text-white mb-10 sm:mb-14 lg:mb-16"
                    variants={headerVariants}
                >
                    <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Pengalaman
                    </motion.span>
                    <br />
                    <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ 
                            background: 'linear-gradient(135deg, #F5C518 0%, #FFD700 50%, #F5C518 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Proyek
                    </motion.span>
                </motion.h2>

                {/* Experience Cards */}
                <div className="space-y-0">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            className="relative py-6 sm:py-8 lg:py-10 px-0 sm:px-4 lg:px-6 -mx-4 sm:-mx-6 lg:-mx-6 rounded-xl sm:rounded-2xl cursor-pointer overflow-hidden"
                            style={{ 
                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                            }}
                            variants={cardVariants}
                            custom={i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            whileHover={{ 
                                backgroundColor: 'rgba(245, 197, 24, 0.03)',
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Animated background glow on hover */}
                            <AnimatePresence>
                                {hoveredIndex === i && (
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 197, 24, 0.06), transparent 40%)',
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            <div className="relative z-10 flex flex-col gap-4 sm:gap-5 lg:gap-6">
                                {/* Header: role + period */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                                    >
                                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-[#F5C518] transition-colors duration-300">
                                            {exp.role}
                                        </h3>
                                        <motion.p 
                                            className="text-sm sm:text-base text-white/40 mt-1 sm:mt-1.5 flex items-center gap-2 flex-wrap"
                                            initial={{ opacity: 0 }}
                                            animate={inView ? { opacity: 1 } : {}}
                                            transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                                        >
                                            <span className="text-white/60">{exp.company}</span>
                                            <span className="text-white/20">·</span>
                                            <span>{exp.location}</span>
                                        </motion.p>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.35 + i * 0.15 }}
                                    >
                                        <span className="text-[10px] sm:text-xs text-white/30 uppercase tracking-widest">
                                            {exp.period}
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Tech tags */}
                                <motion.div 
                                    className="flex flex-wrap gap-2 sm:gap-2.5"
                                    initial="hidden"
                                    animate={inView ? 'visible' : 'hidden'}
                                    variants={{
                                        visible: {
                                            transition: { staggerChildren: 0.08, delayChildren: 0.4 + i * 0.15 }
                                        }
                                    }}
                                >
                                    {exp.tags.map((tag, tagIndex) => (
                                        <motion.span
                                            key={tag}
                                            className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 cursor-default"
                                            style={{ 
                                                border: '1px solid rgba(255,255,255,0.1)', 
                                                borderRadius: '6px',
                                                background: 'rgba(255,255,255,0.02)',
                                            }}
                                            variants={tagVariants}
                                            whileHover={{ 
                                                scale: 1.08,
                                                borderColor: 'rgba(245, 197, 24, 0.5)',
                                                color: 'rgba(245, 197, 24, 0.8)',
                                                background: 'rgba(245, 197, 24, 0.08)',
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </motion.div>

                                {/* Achievements */}
                                <motion.ul 
                                    className="space-y-2.5 sm:space-y-3"
                                    initial="hidden"
                                    animate={inView ? 'visible' : 'hidden'}
                                    variants={{
                                        visible: {
                                            transition: { staggerChildren: 0.1, delayChildren: 0.5 + i * 0.15 }
                                        }
                                    }}
                                >
                                    {exp.achievements.map((a, j) => (
                                        <motion.li 
                                            key={j} 
                                            className="flex gap-3 sm:gap-4 text-sm sm:text-base text-white/50 leading-relaxed"
                                            variants={achievementVariants}
                                            whileHover={{ x: 5, color: 'rgba(255,255,255,0.7)' }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <motion.span 
                                                className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: '#F5C518' }}
                                                initial={{ scale: 0 }}
                                                animate={inView ? { scale: 1 } : {}}
                                                transition={{ 
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 10,
                                                    delay: 0.6 + i * 0.15 + j * 0.1
                                                }}
                                            />
                                            <span className="flex-1">{a}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </div>

                            {/* Bottom border animation */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#F5C518] to-transparent"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={hoveredIndex === i ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{ transformOrigin: 'center' }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom decorative element */}
                <motion.div
                    className="mt-12 sm:mt-16 lg:mt-20 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <motion.div
                        className="w-16 sm:w-20 h-1 rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent, #F5C518, transparent)' }}
                        animate={{ 
                            scaleX: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
