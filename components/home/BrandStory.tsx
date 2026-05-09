export default function BrandStory() {
  const stats = [
    { label: 'DROPS', value: '100+' },
    { label: 'CLIENTES', value: '5K+' },
    { label: 'PAÍSES', value: '12' },
    { label: 'AÐOS', value: '2' },
  ]

  return (
    <section className="bg-brand-black border-t border-white/10 py-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="stamp text-brand-red text-xs mb-6 inline-block">MANIFIESTO</span>
          <h2 className="font-display text-6xl tracking-wider leading-none mb-6">
            ROPA QUE<br />NO EXISTE
          </h2>
          <p className="font-body text-brand-muted leading-relaxed mb-4">
            RLOCKEDD nació de una obsesión por las prendas que nunca debieron existir. Bootlegs de Yankees que ningún licenciatario aprobaría. Gráficas de Marlboro que la publicidad retiró. Merchandise de Camel de los 90s. Colateral de F1 de una era que ya no volverá.
          </p>
          <p className="font-body text-brand-muted leading-relaxed">
            Cada pieza es edición limitada. Cuando se acaba, se acaba.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-brand-black p-8 text-center">
              <div className="font-display text-5xl text-brand-yellow mb-2">{stat.value}</div>
              <div className="font-mono text-xs text-brand-muted tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
