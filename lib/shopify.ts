import { GraphQLClient } from 'graphql-request'
import type { Product, Collection, Cart } from '@/types/shopify'

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!

const client = new GraphQLClient(
  `https://${domain}/api/2024-01/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': token,
      'Content-Type': 'application/json',
    },
  }
)

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    tags
    vendor
    productType
    createdAt
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      edges {
        node { url altText width height }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
    seo { title description }
  }
`

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                id
                title
                handle
                images(first: 1) {
                  edges { node { url altText width height } }
                }
              }
              price { amount currencyCode }
              selectedOptions { name value }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
  }
`

export async function getProducts(first = 12): Promise<Product[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        edges { node { ...ProductFields } }
      }
    }
  `
  const data = await client.request<{ products: { edges: { node: Product }[] } }>(query, { first })
  return data.products.edges.map((e) => e.node)
}

export async function getProduct(handle: string): Promise<Product | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      product(handle: $handle) { ...ProductFields }
    }
  `
  const data = await client.request<{ product: Product | null }>(query, { handle })
  return data.product
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetRecommendations($productId: ID!) {
      productRecommendations(productId: $productId) { ...ProductFields }
    }
  `
  const data = await client.request<{ productRecommendations: Product[] }>(query, { productId })
  return data.productRecommendations
}

export async function getCollection(handle: string): Promise<Collection | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id title handle description
        image { url altText width height }
        products(first: 48, sortKey: CREATED_AT, reverse: true) {
          edges { node { ...ProductFields } }
        }
      }
    }
  `
  const data = await client.request<{ collection: Collection | null }>(query, { handle })
  return data.collection
}

export async function getCollections(): Promise<Collection[]> {
  const query = `
    query GetCollections {
      collections(first: 20) {
        edges {
          node {
            id title handle description
            image { url altText width height }
            products(first: 1) {
              edges { node { id } }
            }
          }
        }
      }
    }
  `
  const data = await client.request<{ collections: { edges: { node: Collection }[] } }>(query)
  return data.collections.edges.map((e) => e.node)
}

export async function createCart(): Promise<Cart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartCreate {
      cartCreate { cart { ...CartFields } }
    }
  `
  const data = await client.request<{ cartCreate: { cart: Cart } }>(mutation)
  return data.cartCreate.cart
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
  `
  const data = await client.request<{ cart: Cart | null }>(query, { cartId })
  return data.cart
}

export async function addToCart(cartId: string, merchandiseId: string, quantity: number): Promise<Cart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
  `
  const data = await client.request<{ cartLinesAdd: { cart: Cart } }>(mutation, {
    cartId,
    lines: [{ merchandiseId, quantity }],
  })
  return data.cartLinesAdd.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
  `
  const data = await client.request<{ cartLinesUpdate: { cart: Cart } }>(mutation, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })
  return data.cartLinesUpdate.cart
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
      }
    }
  `
  const data = await client.request<{ cartLinesRemove: { cart: Cart } }>(mutation, {
    cartId,
    lineIds,
  })
  return data.cartLinesRemove.cart
}
