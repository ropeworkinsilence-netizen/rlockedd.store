import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'

export const metadata: Metadata = {
  title: { default: 'RLOCKEDD  -  Bootleg Culture', template: '%s | RLOCKEDD' },
  description: 'Prendas bootleg de edición limitada. Yankees, Marlboro, Camel, F1 90s. Cultura de la calle sin filtros.',
  keywords: ['bootleg', 'streetwear', 'yankees', 'ropa limitada', 'cultura urbana'],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://rlockedd.com',
    siteName: 'RLOCKEDD',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-brand-black text-brand-cream font-body antialiased">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
