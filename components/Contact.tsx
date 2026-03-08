export default function Contact() {
    const contactLinks = [
        { label: 'Email', value: 'rayhanaldi82@gmail.com', href: 'mailto:rayhanaldi82@gmail.com' },
        { label: 'LinkedIn', value: 'linkedin.com/in/adna', href: 'https://linkedin.com/in/adna' },
        { label: 'GitHub', value: 'github.com/adnaa04', href: 'https://github.com/adnaa04' },
    ]

    return (
        <>
            <section id="contact" className="section-padding section-divider" style={{ background: '#0f0f11' }}>
                <div className="max-w-5xl mx-auto px-6">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#F5C518' }}>
                        Kontak
                    </p>

                    {/* Big CTA text */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight text-white mb-12">
                        Ayo Mulai
                        <br />
                        Kolaborasi!
                    </h2>

                    {/* Links */}
                    <div className="space-y-0">
                        {contactLinks.map(({ label, value, href }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className="flex items-center justify-between py-5 group"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                <div className="flex items-center gap-6">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-white/25 w-20 flex-shrink-0">
                                        {label}
                                    </span>
                                    <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors break-all">
                                        {value}
                                    </span>
                                </div>
                                <span
                                    className="text-lg text-white/20 group-hover:translate-x-1 group-hover:text-white transition-all duration-200"
                                >
                                    ↗
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <footer
                className="py-6"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0f0f11' }}
            >
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-white/25 uppercase tracking-widest">
                        © 2024 Naufal Adna Garibaldi
                    </p>
                    <p className="text-xs text-white/25 uppercase tracking-widest">
                        Built with Next.js
                    </p>
                </div>
            </footer>
        </>
    )
}
