const skillCategories = [
    {
        title: 'Frontend',
        skills: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux'],
    },
    {
        title: 'Tools & Others',
        skills: ['Git & GitHub', 'Figma', 'VS Code', 'Docker', 'Jira', 'Postman', 'Linux CLI'],
    },
]

export default function Skills() {
    return (
        <section id="skills" className="section-padding section-divider" style={{ background: '#0f0f11' }}>
            <div className="max-w-5xl mx-auto px-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#F5C518' }}>
                    Kemampuan
                </p>
                <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight text-white mb-12">
                    Keahlian
                    <br />
                    Teknis
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {skillCategories.map(({ title, skills }) => (
                        <div key={title}>
                            <h3
                                className="text-xs font-bold uppercase tracking-widest mb-6 pb-3"
                                style={{ color: '#F5C518', borderBottom: '1px solid rgba(245,197,24,0.2)' }}
                            >
                                {title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors cursor-default"
                                        style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
