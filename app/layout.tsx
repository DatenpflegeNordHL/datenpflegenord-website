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
  metadataBase: new URL('https://datenpflege-nord.de'),
  title: {
    default: 'DatenpflegeNord – Website-Checks und KI-Systeme für KMU',
    template: '%s | DatenpflegeNord',
  },
  description:
    'Technische Website-Checks, digitale Pflichtstellen und KI-gestützte Büroautomation für kleine Unternehmen in Schleswig-Holstein.',
  applicationName: 'DatenpflegeNord',
  creator: 'DatenpflegeNord',
  publisher: 'DatenpflegeNord',
  keywords: [
    'BFSG-Signalcheck',
    'Pflichten-Check',
    'KI Büroautomation',
    'Website-Check',
    'digitale Pflichtstellen',
    'Schleswig-Holstein',
    'KMU',
    'Barrierefreiheit',
    'E-Rechnung',
    'Audit-Monitoring',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'DatenpflegeNord',
    url: 'https://datenpflege-nord.de',
    title: 'DatenpflegeNord – Website-Checks und KI-Systeme für KMU',
    description:
      'Technische Website-Checks, digitale Pflichtstellen und KI-gestützte Büroautomation für kleine Unternehmen in Schleswig-Holstein.',
    images: [
      {
        url: '/logo.png',
        alt: 'DatenpflegeNord',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DatenpflegeNord – Website-Checks und KI-Systeme für KMU',
    description:
      'Technische Website-Checks, digitale Pflichtstellen und KI-gestützte Büroautomation für kleine Unternehmen in Schleswig-Holstein.',
    images: ['/logo.png'],
  },
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
