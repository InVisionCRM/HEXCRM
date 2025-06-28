import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HEX CRM',
  description: 'HEX CRM - Professional Lead Management and AI-Powered Objection Handling',
  icons: {
    icon: [
      {
        url: '/hex-logo.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: ['/hex-logo.svg'],
    apple: [
      {
        url: '/hex-logo.svg',
        type: 'image/svg+xml',
      }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
