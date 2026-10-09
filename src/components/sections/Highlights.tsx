import { highlights } from '../../config/content';

export function Highlights() {
  return (
    <section aria-labelledby="highlights-heading" className="relative overflow-hidden bg-deep py-16 lg:py-20">
      <div aria-hidden="true" className="bg-dots-light absolute inset-0" />
      <div aria-hidden="true" className="absolute -top-24 -left-24 size-72 rounded-full bg-gold/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-20 -bottom-24 size-72 rounded-full bg-forest-200/10 blur-3xl" />
      <div className="container-page relative">
        <h2 id="highlights-heading" className="text-center text-2xl text-white! sm:text-3xl">
          Why families are joining <span className="text-gold">Tejas Academy</span>
        </h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <li
              key={item.label}
              className="reveal rounded-card border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-gold/40 hover:bg-white/10"
            >
              <p className="text-4xl font-extrabold tracking-tight text-gold">{item.value}</p>
              <h3 className="mt-3 text-lg text-white!">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-100">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
