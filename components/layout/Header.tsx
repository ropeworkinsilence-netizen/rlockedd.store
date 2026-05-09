'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

const TICKER_ITEMS = ['ENVÍO GRATIS +150€', 'EDICION LIMITADA', 'BOOTLEG CULTURE', 'SOLO ORIGINALES']

export default function Header() {
  const { cart, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const totalQty = cart?.totalQuantity ?? 0
  const ticker = TICKER_ITEMS.join(' — ') + ' — 

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black border-b border-white/10">
      <div className="bg-brand-cream text-brand-black overflow-hidden h-7 flex items-center">
        <div className="flex animate-ticker whitespace-nowrap">
          <span className="font-mono text-xs tracking-widest pr-8">{ticker}</span>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-widest text-brand-cream">RLOCKEDD</Link>
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/collections/all" className="font-mono text-xs tracking-widest hover:text-brand-yellow uppercase">Todos los drops</Link>
          <Link href="/collections/yankees" className="font-mono text-xs tracking-widest hover:text-brand-yellow uppercase">Yankees</Link>
        </div>
        <button onClick={openCart} className="relative font-mono text-xs tracking-widest hover:text-brand-yellow" aria-label="Abrir carrito">
          CARRITO
          {totalQty > 0 && <span className="absolute -top-2 -right-3 bg-brand-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{totalQty}</span>}
        </button>
      </nav>
    </header>
  )
}
