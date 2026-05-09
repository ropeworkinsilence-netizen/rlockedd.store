'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ShopifyImage } from '@/types/shopify'

export default function ProductGallery({ images }: { images: ShopifyImage[] }) {
  const [active, setActive] = useState(0)
  if (!images.length) return null

  return (
    <div className="flex gap-4">
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-16">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)} className={"/relative w-16 h-20 overflow-hidden border " + (i === active ? "border-brand-cream" : "border-white/10")}>
              <Image src={img.url} alt={img.altText || ''} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative flex-1 aspect-[3/4] bg-brand-gray overflow-hidden">
        <Image src={images[active].url} alt={images[active].altText || ''} fill className="object-cover" priority />
      </div>
    </div>
  )
}
