'use client'

import { useCart } from '@/context/CartContext'
import { formatMoney } from '@/lib/utils'
import Image from 'next/image'

function CartLineItem({ line }: { line: import('@/types/shopify').CartLine }) {
  const { updateItem, removeItem } = useCart()
  const img = line.merchandise.product.images.edges[0]?.node
  const price = line.merchandise.price

  return (
    <div className="flex gap-4 py-4 border-b border-white/10">
      {img && (
        <div className="relative w-20 h-24 bg-brand-gray flex-shrink-0">
          <Image src={img.url} alt={img.altText ?? line.merchandise.product.title} fill className="object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs tracking-widest truncate">{line.merchandise.product.title}</p>
        <p className="text-brand-muted text-xs mt-1">{line.merchandise.title}</p>
        <p className="font-display text-lg mt-2">{formatMoney(price.amount, price.currencyCode)}</p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
            className="w-7 h-7 border border-white/20 flex items-center justify-center text-sm hover:border-brand-yellow hover:text-brand-yellow transition-colors"
          >
            −
          </button>
          <span className="font-mono text-sm w-4 text-center">{line.quantity}</span>
          <button
            onClick={() => updateItem(line.id, line.quantity + 1)}
            className="w-7 h-7 border border-white/20 flex items-center justify-center text-sm hover:border-brand-yellow hover:text-brand-yellow transition-colors"
          >
            +
          </button>
          <button
            onClick={() => removeItem(line.id)}
            className="ml-2 text-brand-muted hover:text-brand-red text-xs font-mono transition-colors"
          >
            ELIMINAR
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CartDrawer() {
  const { cart, isOpen, closeCart, isLoading } = useCart()
  const lines = cart?.lines.edges.map((e) => e.node) ?? []

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={closeCart} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-black border-l border-white/10 z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0 animate-slide-in-right' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-display text-2xl tracking-wider">CARRITO ({cart?.totalQuantity ?? 0})</h2>
          <button onClick={closeCart} className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">
            CERRAR ✕
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-brand-black/50 flex items-center justify-center z-10">
            <div className="font-mono text-xs tracking-widest animate-pulse">ACTUALIZANDO...</div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-brand-muted">
              <p className="font-mono text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            lines.map((line) => <CartLineItem key={line.id} line={line} />)
          )}
        </div>

        {lines.length > 0 && cart && (
          <div className="p-6 border-t border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-sm text-brand-muted">SUBTOTAL</span>
              <span className="font-display text-2xl">
                {formatMoney(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>
            <a
              href={cart.checkoutUrl}
              className="block w-full bg-brand-cream text-brand-black text-center font-display text-xl tracking-widest py-4 hover:bg-brand-yellow transition-colors"
            >
              FINALIZAR COMPRA
            </a>
            <p className="font-mono text-xs text-brand-muted text-center mt-3">
              Impuestos calculados al checkout
            </p>
          </div>
        )}
      </div>
    </>
  )
}
