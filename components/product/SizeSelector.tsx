'use client'

import type { ProductVariant } from '@/types/shopify'

interface Props {
  variants: ProductVariant[]
  selectedVariant: ProductVariant | null
  onSelect: (v: ProductVariant) => void
}

export default function SizeSelector({ variants, selectedVariant, onSelect }: Props) {
  const sizeOption = variants[0]?.selectedOptions.find(function(o) { return o.name.toLowerCase() === 'size' || o.name.toLowerCase() === 'talla' })
  if (!sizeOption) return null

  return (
    <div>
      <p className="font-mono text-xs text-brand-muted tracking-widest mb-3">TALLA {<selectedVariant?.selectedOptions.find(function(o) { return o.name === sizeOption.name })?.value || '-'}</p>
      <div className="flex flex-wrap gap-2">
        {variants.map(function(v) {
          const label = v.selectedOptions.find(function(o) { return o.name === sizeOption.name })?.value || v.title
          const isSelected = v.id === selectedVariant?.id
          const isSoldOut = !v.availableForSale
          return (
            <button key={v.id} onClick={function() { if (!isSoldOut) onSelect(v) }} disabled={isSoldOut}
              className={"min-w-[48px] px-3 py-2 font-mono text-sm border transition-all " + (isSelected ? 'border-brand-cream bg-brand-cream text-brand-black' : isSoldOut ? 'border-white/10 text-white/20 cursor-not-allowed line-through' : 'border-white/20 hover:border-brand-cream')}>
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
