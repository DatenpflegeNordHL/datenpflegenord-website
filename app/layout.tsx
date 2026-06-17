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
    default: 'KI-Systeme & Website-Checks in Schleswig-Holstein | DatenpflegeNord',
    template: '%s | DatenpflegeNord',
  },
  description:
    'DatenpflegeNord unterstützt Unternehmen in Schleswig-Holstein, Lübeck, Kiel und Hamburg mit KI-Systemen, Website-Checks, Monitoring und klaren Maßnahmen für digitale Prozesse.',
  applicationName: 'DatenpflegeNord',
  creator: 'DatenpflegeNord',
  publisher: 'DatenpflegeNord',
  keywords: [
    'KI-Systeme',
    'Website-Check',
    'Website-Schnellcheck',
    'Website-Monitoring',
    'KI Büroprozesse',
    'Büroautomation',
    'Schleswig-Holstein',
    'Lübeck',
    'Kiel',
    'Hamburg',
    'BFSG',
    'Barrierefreiheit',
    'lokale SEO',
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
    title: 'KI-Systeme & Website-Checks in Schleswig-Holstein | DatenpflegeNord',
    description:
      'DatenpflegeNord unterstützt Unternehmen in Schleswig-Holstein, Lübeck, Kiel und Hamburg mit KI-Systemen, Website-Checks, Monitoring und klaren Maßnahmen für digitale Prozesse.',
    images: [
      {
        url: '/logo.png',
        alt: 'DatenpflegeNord',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KI-Systeme & Website-Checks in Schleswig-Holstein | DatenpflegeNord',
    description:
      'DatenpflegeNord unterstützt Unternehmen in Schleswig-Holstein, Lübeck, Kiel und Hamburg mit KI-Systemen, Website-Checks, Monitoring und klaren Maßnahmen für digitale Prozesse.',
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
