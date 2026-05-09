'use client'

import { useEffect, useState } from 'react'

const DISMISSED_KEY = 'rlockedd_nl_dismissed'

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY)) return
    const t = setTimeout(() => setVisible(true), 8000)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-brand-black border border-white/20 p-8 max-w-md w-full animate-fade-up">
        <button onClick={dismiss} className="absolute top-4 right-4 font-mono text-xs text-brand-muted hover:text-brand-cream">✕</button>
        <span className="stamp text-brand-red text-xs mb-4 inline-block">ACCESO EXCLUSIVO</span>
        <h2 className="font-display text-4xl tracking-wider mb-3">10% DE<br />DESCUENTO</h2>
        <p className="font-mono text-sm text-brand-muted mb-6">Suscríbete y accede a drops exclusivos antes que nadie.</p>
        <form onSubmit={(e) => { e.preventDefault(); dismiss() }} className="flex gap-2">
          <input type="email" placeholder="tu@email.com" required className="flex-1 bg-transparent border border-white/20 px-4 py-3 font-mono text-sm" />
          <button type="submit" className="bg-brand-cream text-brand-black font-display text-lg px-6">OK</button>
        </form>
      </div>
    </div>
  )
}
