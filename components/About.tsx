'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const SPRING: import('framer-motion').Transition = { type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: SPRING,
    },
}

const containerStagger = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
}

/* ── Glossy Stat Card ─────────────────────────── */
function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <motion.div
            variants={fadeUp}
            className="relative text-center py-6 px-3 overflow-hidden group"
            style={{
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.10)',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
            }}
            whileHover={{
                scale: 1.05,
                borderColor: 'rgba(245,197,24,0.35)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(245,197,24,0.08), 0 1px 0 rgba(255,255,255,0.12) inset',
                transition: { duration: 0.2 },
            }}
        >
            {/* Glossy top shine */}
            <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)',
                    borderRadius: '14px 14px 0 0',
                }}
            />
            {/* Dynamic Hover Glow */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(245, 197, 24, 0.15) 0%, transparent 70%)' }}
            />

            <motion.p
                className="relative z-10 text-3xl font-black"
                style={{ color: '#F5C518' }}
                whileHover={{ scale: 1.1, textShadow: '0 0 10px rgba(245,197,24,0.5)', transition: { duration: 0.15 } }}
            >
                {number}
            </motion.p>
            <p className="relative z-10 text-[10px] sm:text-xs text-white/40 uppercase tracking-wide mt-2 whitespace-pre-line leading-relaxed group-hover:text-white/60 transition-colors">
                {label}
            </p>
        </motion.div>
    )
}

/* ── Glossy Info Row ──────────────────────────── */
function InfoRow({
    label, value, href
}: { label: string; value: string; href?: string }) {
    return (
        <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center py-3.5 px-4 sm:px-5 group gap-1 sm:gap-4"
            style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(8px)',
            }}
            whileHover={{
                background: 'rgba(255,255,255,0.05)',
                transition: { duration: 0.2 },
            }}
        >
            <span className="text-xs uppercase tracking-widest text-white/25 font-semibold w-20 flex-shrink-0">
                {label}
            </span>
            {href ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200 break-all"
                >
                    {value}
                </a>
            ) : (
                <span className="text-sm text-white/60 break-all">{value}</span>
            )}
        </motion.div>
    )
}

/* ── Main About ───────────────────────────────── */
export default function About() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="about" className="section-padding section-divider" style={{ background: '#0f0f11' }}>
            <div className="max-w-5xl mx-auto px-6" ref={ref}>

                {/* Label */}
                <motion.p
                    className="text-xs font-semibold uppercase tracking-widest mb-4 inline-block"
                    style={{ color: '#F5C518' }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    Tentang Saya
                </motion.p>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                     <motion.h2
                        className="text-3xl md:text-5xl font-black uppercase text-white"
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                    >
                        Siapa Saya?
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">

                    {/* Left: paragraf */}
                    <motion.div
                        className="space-y-5"
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
                    >
                        {[
                            <>Saya adalah mahasiswa Sistem Informasi <strong>UAD</strong> yang berfokus pada <span className="text-white font-semibold">Frontend Development</span> dengan pengalaman lebih dari 1 tahun dalam membangun aplikasi web modern yang responsif dengan beberapa bahasa pemrograman dan teknologi pengembangan web seperti JavaScript, Python, HTML, dan CSS, serta terus mempelajari praktik pengembangan web yang lebih baik untuk meningkatkan kualitas aplikasi yang saya bangun.</>,
                            <>Saya berfokus pada pembuatan antarmuka yang bersih, fungsional, dan aksesibel. Seorang <span className="text-white font-semibold">problem solver</span> yang selalu menghasilkan kode bersih dan mudah di-maintain dengan kolaborasi AI.</>,
                        ].map((text, i) => (
                            <motion.p
                                key={i}
                                className="text-sm text-white/50 leading-relaxed"
                                variants={fadeUp}
                            >
                                {text}
                            </motion.p>
                        ))}

                        {/* Glossy CTA kiri bawah */}
                        <motion.div
                            variants={fadeUp}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 text-xs font-bold uppercase tracking-widest"
                                style={{
                                    borderRadius: '8px',
                                    border: '1px solid rgba(245,197,24,0.35)',
                                    background: 'rgba(245,197,24,0.07)',
                                    color: '#F5C518',
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: '0 0 0 1px rgba(245,197,24,0.1) inset, 0 1px 0 rgba(255,255,255,0.05) inset',
                                }}
                            >
                                Hubungi Saya ↗
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right: stats + info */}
                    <div className="space-y-6">
                        {/* Stats — glossy cards */}
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            variants={containerStagger}
                        >
                            <StatCard number="1+" label={'Tahun\nPengalaman'} />
                            <StatCard number="2" label={'Project\nSelesai'} />
                            <StatCard number="2" label={'Klien\nPuas'} />
                        </motion.div>

                        {/* Info rows — glossy */}
                        <motion.div
                            className="space-y-1.5"
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
                        >
                            {/* Glossy container */}
                            <div
                                className="overflow-hidden"
                                style={{
                                    borderRadius: '14px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    background: 'rgba(255,255,255,0.025)',
                                    backdropFilter: 'blur(16px)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.06) inset',
                                }}
                            >
                                {/* Top shine */}
                                <div
                                    className="h-px w-full"
                                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
                                />
                                <motion.div variants={containerStagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-col">
                                    <InfoRow label="Domisili" value="Yogyakarta, Indonesia" />
                                    <InfoRow label="Email" value="rayhanaldi82@gmail.com" href="mailto:rayhanadi82@gmail.com" />
                                    <InfoRow label="LinkedIn" value="linkedin.com/in/Naufal Adna" href="https://www.linkedin.com/in/naufal-adna-b65bb736a?utm_source=share_via&utm_content=profile&utm_medium=member_ios" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Status */}
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
