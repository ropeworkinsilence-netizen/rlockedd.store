import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProduct, getProductRecommendations } from '@/lib/shopify'
import ProductGallery from '@/components/product/ProductGallery'
import ProductPageClient from './ProductPageClient'
import FeaturedProducts from '@/components/home/FeaturedProducts'

export const dynamic = 'force-dynamic'

interface Props {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.handle)
  if (!product) return {}
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.handle)
  if (!product) notFound()

  let recommendations: import('@/types/shopify').Product[] = []
  try {
    recommendations = await getProductRecommendations(product.id)
  } catch {}

  const images = product.images.edges.map((e) => e.node)
  const variants = product.variants.edges.map((e) => e.node)

  return (
    <div className="min-h-screen bg-brand-black pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery images={images} />
          <ProductPageClient product={product} variants={variants} />
        </div>
      </div>
      {recommendations.length > 0 && (
        <div className="border-t border-white/10 py-16">
          <h2 className="font-display text-4xl text-center mb-8 tracking-wider">TAMBIÉN TE PUEDE GUSTAR</h2>
          <FeaturedProducts products={recommendations.slice(0, 4)} />
        </div>
      )}
    </div>
  )
}
