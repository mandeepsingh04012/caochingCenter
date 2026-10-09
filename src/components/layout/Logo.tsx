import { Link } from 'react-router';
import { cn } from '../../lib/cn';
import { siteConfig } from '../../config/site';

/** Rising-sun mark: "Tejas" means radiance. */
export function LogoMark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn('shrink-0', className)}>
      <rect width="40" height="40" rx="11" fill={inverse ? '#F4EBDD' : '#174C3C'} />
      <g stroke="#D9B66F" strokeWidth="2" strokeLinecap="round">
        <path d="M20 9.5v3.2M11.2 13.2l2.2 2.2M28.8 13.2l-2.2 2.2M7.8 21.6h3M29.2 21.6h3" />
      </g>
      <path d="M13 26a7 7 0 0 1 14 0Z" fill="#D9B66F" />
      <path d="M8.5 26h23" stroke={inverse ? '#174C3C' : '#F4EBDD'} strokeWidth="2" strokeLinecap="round" />
      <path d="M12.5 30.5h15" stroke={inverse ? '#174C3C' : '#F4EBDD'} strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-3 rounded-lg', className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <LogoMark className="size-10" inverse={inverse} />
      <span className="flex flex-col leading-none">
        <span className={cn('text-[1.15rem] font-extrabold tracking-[0.14em]', inverse ? 'text-white' : 'text-deep')}>
          TEJAS
        </span>
        <span
          className={cn(
            'mt-1 text-[0.62rem] font-semibold tracking-[0.42em]',
            inverse ? 'text-gold' : 'text-gold-700',
          )}
        >
          ACADEMY
        </span>
      </span>
    </Link>
  );
}
