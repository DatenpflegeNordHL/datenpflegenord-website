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
  title: 'DatenpflegeNord | BFSG Website Audit & KI Prozessautomatisierung für KMU',
  description:
    'NordAudit Portal: BFSG Website Audit, Barrierefreiheitsprüfung und Monitoring für KMU. KI Prozessautomatisierung: Individuelle KI-Agenten und Workflow-Automatisierung für wiederkehrende Unternehmensaufgaben.',
  generator: 'v0.app',
  keywords: 'BFSG Website Audit, BFSG Schnellcheck, Barrierefreiheitsprüfung Website, Website Audit für KMU, BFSG Monitoring, WCAG Prüfung, KI Prozessautomatisierung, KI Agenten für Unternehmen, Workflow Automatisierung',
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
