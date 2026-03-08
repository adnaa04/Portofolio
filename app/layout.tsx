import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Naufal Adna Garibaldi - Portfolio',
  description: 'Portfolio Website - Frontend Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
      </body>
    </html>
  )
}
