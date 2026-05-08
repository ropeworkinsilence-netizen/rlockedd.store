'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Cart } from '@/types/shopify'
import { createCart, getCart, addToCart, updateCartLine, removeFromCart } from '@/lib/shopify'

const CART_ID_KEY = 'rlockedd_cart_id'

interface CartContextType {
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const initCart = async () => {
      const storedCartId = localStorage.getItem(CART_ID_KEY)
      if (storedCartId) {
        try {
          const existingCart = await getCart(storedCartId)
          if (existingCart) {
            setCart(existingCart)
            return
          }
        } catch {}
      }
      const newCart = await createCart()
      localStorage.setItem(CART_ID_KEY, newCart.id)
      setCart(newCart)
    }
    initCart()
  }, [])

  const addItem = async (merchandiseId: string, quantity = 1) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updatedCart = await addToCart(cart.id, merchandiseId, quantity)
      setCart(updatedCart)
      setIsOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity)
      setCart(updatedCart)
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (lineId: string) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updatedCart = await removeFromCart(cart.id, [lineId])
      setCart(updatedCart)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
