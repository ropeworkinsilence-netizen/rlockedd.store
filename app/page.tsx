import { getProducts } from '@/lib/shopify'
import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import BrandStory from '@/components/home/BrandStory'
import NewsletterPopup from '@/components/ui/NewsletterPopup'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let products: import('@/types/shopify').Product[] = []
  try {
    products = await getProducts(12)
  } catch (err) {
    console.error('Error fetching products:', err)
  }

  return (
    <>
      <Hero product={products[0] ?? null} />
      <FeaturedProducts products={products} />
      <BrandStory />
      <NewsletterPopup />
    </>
  )
}
