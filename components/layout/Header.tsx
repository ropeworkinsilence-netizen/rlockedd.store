'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

const TICKER_ITEMS = [
  'ENVÍO GRATIS +150€',
  'EDICIÓN LIMITADA',
  'BOOTLEG CULTURE',
  'NUEVO DROP CADA SEMANA',
  'SOLO ORIGINALES',
]

export default function Header() {
  const { cart, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const totalQty = cart?.totalQuantity ?? 0

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS].join('  -  ') + '  -  '

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black border-b border-white/10">
      {/* Ticker */}
      <div className="bg-brand-cream text-brand-black overflow-hidden h-7 flex items-center">
        <div className="flex animate-ticker whitespace-nowrap">
          <span className="font-mono text-xs tracking-widest pr-8">{tickerContent}</span>
          <span className="font-mono text-xs tracking-widest pr-8">{tickerContent}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          className="lg:hidden text-brand-cream"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-6 h-px bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        <Link href="/" className="font-display text-2xl tracking-widest text-brand-cream">
          RLOCKEDD
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/collections/all" className="font-mono text-xs tracking-widest hover:text-brand-yellow transition-colors uppercase">
            Todos los drops
          </Link>
          <Link href="/collections/yankees" className="font-mono text-xs tracking-widest hover:text-brand-yellow transition-colors uppercase">
            Yankees
          </Link>
          <Link href="/collections/vintage" className="font-mono text-xs tracking-widest hover:text-brand-yellow transition-colors uppercase">
            Vintage
          </Link>
        </div>

        <button
          onClick={openCart}
          className="relative font-mono text-xs tracking-widest hover:text-brand-yellow transition-colors"
          aria-label="Abrir carrito"
        >
          CARRITO
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-3 bg-brand-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-body">
              {totalQty}
            </span>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-brand-black border-t border-white/10 px-4 py-6 flex flex-col gap-4">
          <Link href="/collections/all" className="font-mono text-sm tracking-widest uppercase" onClick={() => setMenuOpen(false)}>
            Todos los drops
          </Link>
          <Link href="/collections/yankees" className="font-mono text-sm tracking-widest uppercase" onClick={() => setMenuOpen(false)}>
            Yankees
          </Link>
          <Link href="/collections/vintage" className="font-mono text-sm tracking-widest uppercase" onClick={() => setMenuOpen(false)}>
            Vintage
          </Link>
        </div>
      )}
    </header>
  )
}
