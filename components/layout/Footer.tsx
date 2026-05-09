import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10 py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[20vw] text-white/[0.02] tracking-widest leading-none">
          RLOCKEDD
        </span>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-display text-xl tracking-wider mb-4">TIENDA</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/collections/all" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">Todos los drops</Link></li>
              <li><Link href="/collections/yankees" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">Yankees Bootleg</Link></li>
              <li><Link href="/collections/vintage" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">Vintage</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl tracking-wider mb-4">INFO</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/pages/about" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">Sobre nosotros</Link></li>
              <li><Link href="/pages/contact" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl tracking-wider mb-4">AYUDA</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/pages/shipping" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">Envíos</Link></li>
              <li><Link href="/pages/returns" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">Devoluciones</Link></li>
              <li><Link href="/pages/sizing" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">Guía de tallas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl tracking-wider mb-4">SÍGUENOS</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="https://instagram.com/rlockedd" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">Instagram</a></li>
              <li><a href="https://tiktok.com/@rlockedd" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-brand-muted hover:text-brand-cream transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-display text-2xl tracking-widest">RLOCKEDD</span>
          <p className="font-mono text-xs text-brand-muted">© 2025 RLOCKEDD. Bootleg culture since 2024.</p>
        </div>
      </div>
    </footer>
  )
}
