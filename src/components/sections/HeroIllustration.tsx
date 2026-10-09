/**
 * Default hero artwork: a rising sun over an open book.
 * Replaced automatically when `imagery.hero.src` is configured.
 */
export function HeroIllustration({ className }: { className?: string }) {
  const rays = Array.from({ length: 7 }, (_, i) => (Math.PI * (15 + i * 25)) / 180);
  const dots = Array.from({ length: 20 }, (_, i) => ({ x: 372 + (i % 5) * 18, y: 64 + Math.floor(i / 5) * 18 }));
  return (
    <svg viewBox="0 0 520 600" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <rect width="520" height="600" fill="#174C3C" />
      <rect y="420" width="520" height="180" fill="#10392D" />

      {/* Decorative geometry */}
      <g fill="#D9B66F" fillOpacity=".45">
        {dots.map((d) => (
          <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r="2.2" />
        ))}
      </g>
      <g fill="none" stroke="#D9B66F" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M62 214V86l128 128Z" />
        <path d="M84 192v-52l52 52Z" strokeOpacity=".6" />
      </g>
      <circle cx="430" cy="226" r="20" fill="none" stroke="#F4EBDD" strokeOpacity=".35" strokeWidth="2" />
      <path d="M212 120l5 13 13 5-13 5-5 13-5-13-13-5 13-5Z" fill="#F4EBDD" fillOpacity=".7" />
      <path d="M448 330l3.5 9 9 3.5-9 3.5-3.5 9-3.5-9-9-3.5 9-3.5Z" fill="#F4EBDD" fillOpacity=".5" />

      {/* Rising sun */}
      <circle cx="260" cy="420" r="196" fill="none" stroke="#D9B66F" strokeOpacity=".22" strokeWidth="1.5" />
      <circle cx="260" cy="420" r="172" fill="none" stroke="#D9B66F" strokeOpacity=".35" strokeWidth="1.5" />
      <g stroke="#D9B66F" strokeWidth="5" strokeLinecap="round">
        {rays.map((a) => (
          <line
            key={a}
            x1={260 + Math.cos(a) * 214}
            y1={420 - Math.sin(a) * 214}
            x2={260 + Math.cos(a) * 240}
            y2={420 - Math.sin(a) * 240}
          />
        ))}
      </g>
      <path d="M118 420a142 142 0 0 1 284 0Z" fill="#D9B66F" />
      <path d="M150 420a110 110 0 0 1 220 0Z" fill="#E3C588" />
      <line x1="30" y1="420" x2="490" y2="420" stroke="#F4EBDD" strokeOpacity=".5" strokeWidth="2" />

      {/* Open book */}
      <path d="M260 448c-44-22-102-24-158-12v104c56-12 114-10 158 14Z" fill="#FBF8F2" />
      <path d="M260 448c44-22 102-24 158-12v104c-56-12-114-10-158 14Z" fill="#F4EBDD" />
      <path d="M260 448v106" stroke="#D9B66F" strokeWidth="2" />
      <g fill="none" stroke="#174C3C" strokeOpacity=".22" strokeWidth="2" strokeLinecap="round">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path d={`M122 ${462 + i * 16}c42-8 86-6 120 8`} />
            <path d={`M278 ${470 + i * 16}c34-14 78-16 120-8`} />
          </g>
        ))}
      </g>

      {/* Pencil */}
      <g transform="rotate(-9 260 574)">
        <rect x="150" y="566" width="190" height="14" rx="2" fill="#D9B66F" />
        <rect x="150" y="566" width="22" height="14" rx="2" fill="#F4EBDD" />
        <path d="M340 566l26 7-26 7Z" fill="#F4EBDD" />
        <path d="M358 570.8l8 2.2-8 2.2Z" fill="#27332E" />
      </g>
    </svg>
  );
}
