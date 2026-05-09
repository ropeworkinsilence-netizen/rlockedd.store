import type { Product } from '@/types/shopify'
import ProductCard from '@/components/product/ProductCard'

interface Props {
  products: Product[]
}

export default function FeaturedProducts({ products }: Props) {
  if (!products.length) return null

  return (
    <section className="bg-brand-black">
      <div className="border-y border-white/10 py-6 px-4 flex items-center justify-between">
        <h2 className="font-display text-4xl tracking-wider">ÚLTIMO DROPS</h2>
        <a href="/collections/all" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors tracking-widest">
          VER TODO →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-brand-gray">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
