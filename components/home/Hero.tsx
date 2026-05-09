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
      {/* Left: editorial text */}
      <div className="flex flex-col justify-end px-8 py-16 lg:py-24 bg-brand-black relative z-10 order-2 lg:order-1">
        <div className="relative">
          <span className="stamp text-brand-red text-xs mb-4 inline-block">SS26 DROP</span>
          <h1 className="font-display text-[14vw] lg:text-[8vw] leading-none tracking-tight text-brand-cream mb-6">
            BOOTLEG<br />CULTURE
          </h1>
          <p className="font-mono text-brand-muted text-sm max-w-sm mb-8 leading-relaxed">
            Prendas que no deberían existir. Yankee bootlegs, Marlboro graphics, Camel merch, F1 90s. Edición limitada.
          </p>
          <div className="flex gap-4">
            <Link
              href="/collections/all"
              className="bg-brand-cream text-brand-black font-display text-xl tracking-widest px-8 py-4 hover:bg-brand-yellow transition-colors"
            >
              VER DROPS
            </Link>
            {product && (
              <Link
                href={`/products/${product.handle}`}
                className="border border-brand-cream text-brand-cream font-display text-xl tracking-widest px-8 py-4 hover:bg-brand-cream hover:text-brand-black transition-colors"
              >
                NUEVO DROP
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Right: product image */}
      <div className="relative bg-brand-gray min-h-[50vh] lg:min-h-screen order-1 lg:order-2">
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={heroImage.altText ?? 'Hero product'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-brand-gray flex items-center justify-center">
            <span className="font-display text-6xl text-white/10">RLOCKEDD</span>
          </div>
        )}
        {product && (
          <div className="absolute bottom-6 left-6 right-6">
            <Link
              href={`/products/${product.handle}`}
              className="bg-brand-black/80 backdrop-blur-sm border border-white/20 p-4 flex justify-between items-center hover:border-brand-yellow transition-colors group"
            >
              <div>
                <p className="font-mono text-xs text-brand-muted tracking-widest">NUEVO DROP</p>
                <p className="font-display text-xl tracking-wider group-hover:text-brand-yellow transition-colors">
                  {product.title.toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl">
                  {formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                </p>
              </div>
            </Link>
          </div>
        )}
        {/* Stamps overlay */}
        <div className="absolute top-6 right-6 opacity-70">
          <span className="stamp text-brand-yellow text-xs block rotate-12">ORIGINAL</span>
        </div>
      </div>
    </section>
  )
}
