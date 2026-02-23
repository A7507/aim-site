import React from "react"
import type { Metadata, Viewport } from 'next'
import { Oswald, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import { CartSidebar } from '@/components/cart-sidebar'
import { AdminFloatButton } from '@/components/admin-float-button'
import './globals.css'

const _oswald = Oswald({ subsets: ["latin"] });
const _inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: '#06080c',
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'AIM PVP - Loja Oficial',
  description: 'Loja oficial do servidor AIM PVP FiveM. Compre VIPs, Carros, Cash e muito mais!',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased bg-background text-foreground">
        <CartProvider>
          {children}
          <CartSidebar />
          <AdminFloatButton />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
