'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/about', label: 'Tentang' },
  { href: '/experience', label: 'Pengalaman' },
  { href: '/projects', label: 'Proyek' },
  { href: '/contact', label: 'Kontak' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky w-full z-50 top-0 left-0" style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Tombol Home */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-200"
          style={{
            border: pathname === '/' ? '1px solid #F5C518' : '1px solid rgba(255,255,255,0.15)',
            color: pathname === '/' ? '#F5C518' : 'rgba(255,255,255,0.6)',
            borderRadius: '999px',
            padding: '0.45rem 1rem',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
            <polyline points="9 21 9 12 15 12 15 21" />
          </svg>
          Beranda
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="text-xs font-semibold uppercase tracking-widest transition-colors duration-200"
                style={{ color: active ? '#F5C518' : 'rgba(255,255,255,0.5)' }}
              >
                {label}
                {active && (
                  <span className="block h-px mt-0.5" style={{ background: '#F5C518' }} />
                )}
              </Link>
            )
          })}
          
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 py-6 flex flex-col gap-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {navLinks.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold uppercase tracking-widest transition-colors"
                style={{ color: active ? '#F5C518' : 'rgba(255,255,255,0.6)' }}
              >
                {label}
              </Link>
            )
          })}
          <a
            href="/cv.pdf"
            download
            className="btn-outline self-start mt-2"
          >
            Download CV
          </a>
        </div>
      )}
    </nav>
  )
}