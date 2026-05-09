import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div><h3 className="font-display text-xl mb-4">UENDA</h3><Link href="/collections/all" className="font-mono text-xs text-brand-muted block mb-2">Todos los drops</Link></div>
          <div><h3 className="font-display text-xl mb-4">INFO</h3><Link href="/pages/about" className="font-mono text-xs text-brand-muted block mb-2">Sobre nosotros</Link></div>
          <div><h3 className="font-display text-xl mb-4">AYUDA3</h3><Link href="/pages/shipping" className="font-mono text-xs text-brand-muted block mb-2">Envíos</Link></div>
          <div><h3 className="font-display text-xl mb-4">SIGUENOS</h3><a href="https://instagram.com/rlockedd" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-brand-muted block mb-2">Instagram</a></div>
        </div>
        <div className="border-t border-white/10 pt-8 flex justify-between items-center">
          <span className="font-display text-2xl">RLOCKEDD</span>
          <p className="font-mono text-xs text-brand-muted">© 2025 RLOCKEDD</p>
        </div>
      </div>
    </footer>
  )
}
