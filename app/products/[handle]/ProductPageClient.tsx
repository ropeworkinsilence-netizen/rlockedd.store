'use client'

import { useState, useEffect } from 'react'
import type { Product, ProductVariant } from '@/types/shopify'
import { formatMoney, getDiscountPercent } from '@/lib/utils'
import SizeSelector from '@/components/product/SizeSelector'
import AddToCart from '@/components/product/AddToCart'

function ViewingNow() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(Math.floor(Math.random() * 8) + 3)
  }, [])
  if (!count) return null
  return (
    <div className="flex items-center gap-2 text-sm text-brand-muted font-mono">
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      {count} personas viendo esto ahora
    </div>
  )
}

interface Props {
  product: Product
  variants: ProductVariant[]
}

export default function ProductPageClient({ product, variants }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants.find((v) => v.availableForSale) ?? variants[0] ?? null
  )
  const [isExpanded, setIsExpanded] = useState(false)

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice
  const compareAt = selectedVariant?.compareAtPrice ?? product.compareAtPriceRange.minVariantPrice
  const discount = compareAt ? getDiscountPercent(price.amount, compareAt.amount) : 0
  const isLowStock = selectedVariant?.quantityAvailable != null && selectedVariant.quantityAvailable <= 3

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-2">{product.vendor}</p>
        <h1 className="font-display text-5xl tracking-wider leading-none mb-4">{product.title.toUpperCase()}</h1>
        <ViewingNow />
      </div>

      <div className="flex items-baseline gap-4">
        <span className="font-display text-3xl text-brand-cream">
          {formatMoney(price.amount, price.currencyCode)}
        </span>
        {compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount) && (
          <>
            <span className="text-brand-muted line-through text-lg">
              {formatMoney(compareAt.amount, compareAt.currencyCode)}
            </span>
            {discount > 0 && (
              <span className="bg-brand-red text-white font-mono text-xs px-2 py-1">-{discount}%</span>
            )}
          </>
        )}
      </div>

      {isLowStock && (
        <div className="bg-brand-red/10 border border-brand-red/30 px-4 py-2 font-mono text-sm text-brand-red">
          ⚡ ÚLTIMAS {selectedVariant?.quantityAvailable} UNIDADES
        </div>
      )}

      {variants.length > 1 && (
        <SizeSelector
          variants={variants}
          selectedVariant={selectedVariant}
          onSelect={setSelectedVariant}
        />
      )}

      <AddToCart variant={selectedVariant} />

      <div className="border-t border-white/10 pt-6">
        <button
          className="flex items-center justify-between w-full font-mono text-sm uppercase tracking-widest"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>Descripción</span>
          <span>{isExpanded ? '−' : '+'}</span>
        </button>
        {isExpanded && (
          <div
            className="mt-4 text-brand-muted text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        )}
      </div>

      <div className="flex gap-4 font-mono text-xs text-brand-muted border-t border-white/10 pt-4">
        <span>🔒 Pago seguro</span>
        <span>📦 Envío rápido</span>
        <span>↩ Devoluciones 14 días</span>
      </div>
    </div>
  )
}
