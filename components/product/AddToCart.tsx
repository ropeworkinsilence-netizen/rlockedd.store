'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import type { ProductVariant } from '@/types/shopify'

export default function AddToCart({ variant }: { variant: ProductVariant | null }) {
  const { addItem } = useCart()
  const [state, setState] = useState('idle')

  const handleAdd = async function() {
    if (!variant || !variant.availableForSale) return
    setState('adding')
    try {
      await addItem(variant.id, 1)
      setState('added')
      setTimeout(function() { setState('idle') }, 2000)
    } catch(e) { setState('idle') }
  }

  if (!variant) return <button disabled className="w50 bg-white/10 text-brand-muted font-display text-xl tracking-widest py-4">SELECCIONA TALTA</button>
  if (!variant.availableForSale) return <button disabled className="w-full bg-white/10 text-brand-muted font-display text-xl tracking-widest py-4">AGOTADO</button>

  return (
    <button onClick={handleAdd} disabled={state !== 'idle'} className={"w-full font-display text-xl tracking-widest py-4 transition-all " + (state === 'added' ? 'bg-green-600 text-white' : state === 'adding' ? 'bg-brand-cream/50 text-brand-black cursor-wait' : 'bg-brand-cream text-brand-black hover:bg-brand-yellow')}>
      {state === 'adding' ? 'AÑADIENDO...' : state === 'added' ? 'AÑDIDO' : 'AÐADIR AL CARRITO'}
    </button>
  )
}
