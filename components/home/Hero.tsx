import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types/shopify'
import { formatMoney } from '@/lib/utils'

interface Props {
  product: Product | null
}

export default function Hero({ product }: Props) {
  const heroImage = product?.images.edges[0]?.node

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
      <div className="flex flex-col justify-end px-8 py-16 bg-brand-black relative z-10 order-2">
        <span className="stamp text-brand-red text-xs mb-4 inline-block">SS26 DROP</span>
        <h1 className="font-display text-[14vw] leading-none tracking-tight text-brand-cream mb-6">BOOTLE@ºbr />CULTURE</h1>
        <p className="font-mono text-brand-muted text-sm max-w-sm mb-8 leading-relaxed">Prendas que no deber√≠an existir.</p>
        <div className="flex gap-4">
          <Link href="/collections/all" className="bg-brand-cream text-brand-black font-display text-xl tracking-widest px-8 py-4">VER DROPS</Link>
        </div>
      </div>
      <div className="relative bg-brand-gray min-h-[50vh] order-1">
        {heroImage ? (<Image src={heroImage.url} alt={heroImage.altText || 'Hero"} fill className="object-cover" priority />) : (<div className="absolute inset-0 flex items-center justify-center"><span className="font-display text-6xl text-white/10">RLOCKEDD</span></div>)}
      </div>
    </section>
  )
}
