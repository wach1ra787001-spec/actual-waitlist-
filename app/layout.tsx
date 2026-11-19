import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'JNV Pro Trading Journal — Join the Waitlist',
  description:
    'Be among the first to access JNV Pro — the trading journal built for serious traders. Track trades, spot patterns, and improve performance.',
  keywords: ['trading journal', 'trade tracking', 'trading performance', 'JNV Pro'],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'JNV Pro Trading Journal — Join the Waitlist',
    description: 'Be among the first founding members of JNV Pro.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#040816',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-[#040816]`}>
      <body className="font-sans antialiased bg-[#040816] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
