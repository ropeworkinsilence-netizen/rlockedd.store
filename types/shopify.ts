export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface Money {
  amount: string
  currencyCode: string
}

export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable: number | null
  price: Money
  compareAtPrice: Money | null
  selectedOptions: {
    name: string
    value: string
  }[]
}

export interface Product {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  tags: string[]
  vendor: string
  productType: string
  createdAt: string
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  compareAtPriceRange: {
    minVariantPrice: Money
  }
  images: {
    edges: {
      node: ShopifyImage
    }[]
  }
  variants: {
    edges: {
      node: ProductVariant
    }[]
  }
  seo: {
    title: string
    description: string
  }
}

export interface Collection {
  id: string
  title: string
  handle: string
  description: string
  image: ShopifyImage | null
  products: {
    edges: {
      node: Product
    }[]
  }
}

export interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      id: string
      title: string
      handle: string
      images: {
        edges: { node: ShopifyImage }[]
      }
    }
    price: Money
    selectedOptions: {
      name: string
      value: string
    }[]
  }
  cost: {
    totalAmount: Money
  }
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: {
    edges: {
      node: CartLine
    }[]
  }
  cost: {
    totalAmount: Money
    subtotalAmount: Money
    totalTaxAmount: Money | null
  }
}
