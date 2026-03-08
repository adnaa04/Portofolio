'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const SPRING: import('framer-motion').Transition = { type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }
const BOUNCE_SPRING: import('framer-motion').Transition = { type: 'spring', stiffness: 400, damping: 15 }

interface Project {
    number: string
    title: string
    description: string
    techStack: string[]
    website: string | null
    repo: string | null
    previewImg?: string | null
    previewColor: string
    tags?: string[]
}

const projects: Project[] = [
    {
        number: '01',
        title: 'Peta Bencana Sriharjo',
        description: 'Sistem informasi peta bencana Desa Sriharjo menggunakan Leaflet.js dan Tailwind CSS. Dilengkapi pengelompokkan data penduduk per RT/RW dan Padukuhan.',
        techStack: ['Leaflet.js','JavaScript', 'Tailwind CSS', 'Python'],
        website: 'https://petabencanasriharjo.com/splash/',
        repo: null,
        previewImg: '/preview-sriharjo.png',
        previewColor: 'from-yellow-500/15 to-amber-500/5',
    },
    {
        number: '02',
        title: 'Diskusi Ilmu',
        description: 'Platform pembelajaran online untuk siswa SMA yang menyediakan materi, tugas, dan informasi secara digital untuk mendukung belajar di luar kelas.',
        techStack: ['Next.Js', 'React', 'Firebase', 'Material UI','Frame Motion','React-PageFLip'],
        website: 'https://www.diskusiilmu.com/',
        repo: null,
        previewImg: '/preview-diskusiilmu.png',
        previewColor: 'from-blue-500/15 to-indigo-500/5',
    },
]

/* ── Glossy Preview Card ───────────────────────── */
function GlossyCard({ project, index }: { project: Project; index: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    const screenshotUrl = project.previewImg
        ? project.previewImg
        : project.website
            ? `https://image.thum.io/get/width/640/crop/420/${project.website}`
            : null

    return (
        <motion.div
            ref={ref}
            className="group relative overflow-hidden rounded-2xl"
            style={{
                border: '1px solid rgba(255,255,255,0.10)',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, ...SPRING }}
            whileHover={{ 
                y: -8, 
                boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(245,197,24,0.15), 0 1px 0 rgba(255,255,255,0.1) inset',
                borderColor: 'rgba(245,197,24,0.4)',
                transition: { duration: 0.3 } 
            }}
        >
            {/* Glossy top shine */}
            <div
                className="absolute inset-x-0 top-0 h-px z-20 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
            />
            <div
                className="absolute inset-x-0 top-0 h-16 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)' }}
            />

            {/* Hover glossy sheen */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)' }}
            />

            {/* Browser bar */}
            <div
                className="relative z-10 flex items-center gap-1.5 px-3 py-2.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.45)' }}
            >
                {/* Mac buttons */}
                <div className="flex gap-1.5 group/buttons">
                    <motion.div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,95,86,0.7)' }} whileHover={{ scale: 1.2 }} transition={BOUNCE_SPRING} />
                    <motion.div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,189,46,0.7)' }} whileHover={{ scale: 1.2 }} transition={BOUNCE_SPRING} />
                    <motion.div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(39,201,63,0.7)' }} whileHover={{ scale: 1.2 }} transition={BOUNCE_SPRING} />
                </div>
                <div
                    className="flex-1 ml-2 px-2.5 py-1 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <p className="text-xs text-white/25 truncate">
                        {project.website
                            ? project.website.replace('https://', '').replace('http://', '').replace(/\/$/, '')
                            : 'github.com'}
                    </p>
                </div>
            </div>

            {/* Screenshot area */}
            <div className="relative overflow-hidden" style={{ height: '200px' }}>
                {screenshotUrl ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={screenshotUrl}
                            alt={`Preview ${project.title}`}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                const fb = e.currentTarget.nextElementSibling as HTMLElement | null
                                if (fb) fb.style.display = 'flex'
                            }}
                        />
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${project.previewColor} items-center justify-center`}
                            style={{ display: 'none' }}
                        >
                            <p className="text-xs text-white/20 uppercase tracking-widest">Preview tidak tersedia</p>
                        </div>
                    </>
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${project.previewColor} flex items-center justify-center`}>
                        <p className="text-xs text-white/20 uppercase tracking-widest">Tidak ada website</p>
                    </div>
                )}
                {/* Bottom vignette */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
                />
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                        <span className="text-xs font-bold" style={{ color: '#F5C518' }}>{project.number}</span>
                        <h3 className="text-lg font-bold text-white mt-0.5 leading-tight group-hover:text-[#F5C518] transition-colors">{project.title}</h3>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 mt-0.5">
                        {project.website && (
                            <a
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest px-2.5 py-1.5 transition-all duration-200"
                                style={{
                                    borderRadius: '6px',
                                    border: '1px solid rgba(245,197,24,0.35)',
                                    color: '#F5C518',
                                    background: 'rgba(245,197,24,0.07)',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,197,24,0.18)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,197,24,0.07)')}
                            >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                                Link
                            </a>
                        )}
                        {project.repo && (
                            <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest px-2.5 py-1.5 transition-all duration-200"
                                style={{
                                    borderRadius: '6px',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    color: 'rgba(255,255,255,0.5)',
                                    background: 'rgba(255,255,255,0.03)',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                            >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                                </svg>
                                Repo
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-sm text-white/40 leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs text-white/30 uppercase tracking-wide px-2 py-0.5"
                            style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px' }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom glossy border */}
            <div
                className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
            />
        </motion.div>
    )
}

/* ── Main Projects ─────────────────────────────── */
export default function Projects() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section id="projects" className="section-padding section-divider" style={{ background: '#0f0f11' }}>
            <div className="max-w-5xl mx-auto px-6" ref={ref}>
                <motion.p
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: '#F5C518' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Portofolio
                </motion.p>
                <motion.h2
                    className="text-4xl md:text-5xl font-black uppercase leading-tight text-white mb-12"
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ...SPRING }}
                >
                    Proyek<br />Terbaru
                </motion.h2>

                {/* Centered responsive grid: max 2 cols centered since there are 2 items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {projects.map((project, i) => (
                        <GlossyCard key={project.number} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
