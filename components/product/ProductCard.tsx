import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types/shopify'
import { formatMoney, getDiscountPercent, isNewProduct } from '@/lib/utils'

export default function ProductCard({ product }: { product: Product }) {
  const images = product.images.edges.map((e) => e.node)
  const price = product.priceRange.minVariantPrice
  const compareAt = product.compareAtPriceRange.minVariantPrice
  const discount = getDiscountPercent(price.amount, compareAt.amount)
  const isNew = isNewProduct(product.createdAt)
  const isSoldOut = !product.availableForSale

  return (
    <Link href={`/products/${product.handle}`} className="bg-brand-black block group relative overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-gray">
        {images[0] && (
          <Image
            src={images[0].url}
            alt={images[0].altText ?? product.title}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${images[1] ? 'group-hover:opacity-0' : ''}`}
          />
        )}
        {images[1] && (
          <Image
            src={images[1].url}
            alt={images[1].altText ?? product.title}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"
          />
        )}
        {isSoldOut && (
          <div className="absolute inset-0 bg-brand-black/60 flex items-center justify-center">
            <span className="stamp text-brand-cream text-sm">AGOTADO</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isNew && !isSoldOut && (
            <span className="bg-brand-red text-white font-mono text-[10px] px-2 py-0.5 tracking-widest">NEW DROP</span>
          )}
          {discount > 0 && !isSoldOut && (
            <span className="bg-brand-yellow text-brand-black font-mono text-[10px] px-2 py-0.5 tracking-widest">-{discount}%</span>
          )}
        </div>
      </div>
      <div className="p-3">
        <p className="font-mono text-[10px] text-brand-muted tracking-widest mb-1">{product.vendor}</p>
        <h3 className="font-display text-lg tracking-wider leading-tight group-hover:text-brand-yellow transition-colors line-clamp-2">
          {product.title.toUpperCase()}
        </h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className={`font-display text-xl ${isSoldOut ? 'text-brand-muted' : 'text-brand-cream'}`}>
            {formatMoney(price.amount, price.currencyCode)}
          </span>
          {discount > 0 && (
            <span className="font-mono text-xs text-brand-muted line-through">
              {formatMoney(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
