import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollection, getProducts } from '@/lib/shopify'
import type { Product } from '@/types/shopify'
import ProductCard from '@/components/product/ProductCard'

export const dynamic = 'force-dynamic'

interface Props {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.handle === 'all') return { title: 'Todos los productos' }
  const collection = await getCollection(params.handle)
  return { title: collection?.title ?? 'Colección' }
}

export default async function CollectionPage({ params }: Props) {
  let products: Product[] = []
  let title = 'TODOS LOS DROPS'

  if (params.handle === 'all') {
    try { products = await getProducts(48) } catch {}
  } else {
    try {
      const collection = await getCollection(params.handle)
      if (!collection) notFound()
      title = collection.title.toUpperCase()
      products = collection.products.edges.map((e) => e.node)
    } catch { notFound() }
  }

  return (
    <div className="min-h-screen bg-brand-black pt-16">
      <div className="border-b border-white/10 py-16 text-center">
        <h1 className="font-display text-7xl tracking-wider">{title}</h1>
        <p className="font-mono text-brand-muted text-sm mt-2">{products.length} productos</p>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-24 text-brand-muted font-mono">
          No hay productos disponibles
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-brand-gray">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
