import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount: string, currencyCode: string = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: currencyCode }).format(parseFloat(amount))
}

export function getDiscountPercent(price: string, compareAtPrice: string): number {
  const p = parseFloat(price)
  const c = parseFloat(compareAtPrice)
  if (!c || c <= p) return 0
  return Math.round(((c - p) / c) * 100)
}

export function isNewProduct(createdAt: string): boolean {
  const created = new Date(createdAt)
  const now = new Date()
  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays <= 30
}
