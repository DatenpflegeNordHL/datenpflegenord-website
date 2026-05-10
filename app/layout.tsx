import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DatenpflegeNord | Automatisierte Website-Prüfung & KI-Automation für KMU',
  description:
    'WebPflicht Monitor: Automatisierte Vorab-Prüfung Ihrer Website auf BFSG-Anforderungen, Datenschutz & Technik. BetriebsKI: KI-unterstützte Automatisierung Ihrer Unternehmensprozesse. Klarstand Portal: Dashboard für alle Erkenntnisse und KI-Status.',
  generator: 'v0.app',
  keywords: 'Website-Check, BFSG, Barrierefreiheit, Datenschutz, KI-Automation, KMU',
}

export const viewport = {
  themeColor: '#1a2e52',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
