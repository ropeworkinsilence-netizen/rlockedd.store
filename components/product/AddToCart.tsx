'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import type { ProductVariant } from '@/types/shopify'

export default function AddToCart({ variant }: { variant: ProductVariant | null }) {
  const { addItem } = useCart()
  const [state, setState] = useState<'idle' | 'adding' | 'added'>('idle')

  const handleAdd = async () => {
    if (!variant || !variant.availableForSale) return
    setState('adding')
    try {
      await addItem(variant.id, 1)
      setState('added')
      setTimeout(() => setState('idle'), 2000)
    } catch {
      setState('idle')
    }
  }

  if (!variant) {
    return (
      <button disabled className="w-full bg-white/10 text-brand-muted font-display text-xl tracking-widest py-4 cursor-not-allowed">
        SELECCIONA TALLA
      </button>
    )
  }

  if (!variant.availableForSale) {
    return (
      <button disabled className="w-full bg-white/10 text-brand-muted font-display text-xl tracking-widest py-4 cursor-not-allowed">
        AGOTADO
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      disabled={state !== 'idle'}
      className={`w-full font-display text-xl tracking-widest py-4 transition-all ${
        state === 'added'
          ? 'bg-green-600 text-white'
          : state === 'adding'
          ? 'bg-brand-cream/50 text-brand-black cursor-wait'
          : 'bg-brand-cream text-brand-black hover:bg-brand-yellow'
      }`}
    >
      {state === 'adding' ? 'AÑADIENDO...' : state === 'added' ? '✓ AÑADIDO' : 'AÑADIR AL CARRITO'}
    </button>
  )
}
