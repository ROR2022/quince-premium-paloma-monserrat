import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { MusicProvider } from '@/context/music-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'XV Años Paloma Monserrat - 18 de Abril 2026',
  description: 'Invitación digital para los XV años de Paloma Monserrat - 18 de Abril 2026',
  generator: 'Invitaciones Web MX',
  // Next.js 15 detecta automáticamente favicon.ico, icon.png y apple-icon.png en /app
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  )
}
