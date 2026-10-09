import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'light';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-60 motion-safe:active:scale-[0.98]';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-forest text-white shadow-soft hover:bg-deep hover:shadow-lift',
  secondary: 'bg-beige text-deep hover:bg-beige-200',
  outline: 'border border-forest/30 bg-white text-forest hover:border-forest hover:bg-forest-50',
  ghost: 'text-forest hover:bg-forest-50',
  gold: 'bg-gold text-deep shadow-soft hover:bg-[#e3c588]',
  light: 'border border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
};

function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps>;

export function Button({ variant, size, icon, iconRight, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

type ButtonLinkProps = CommonProps & {
  /** Internal route ("/courses"), in-page anchor ("#id") or external URL. */
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps | 'href'>;

/**
 * Link styled as a button. Internal paths use client-side routing;
 * tel:, https: and in-page anchors render a regular <a>.
 */
export function ButtonLink({ href, variant, size, icon, iconRight, className, children, external, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {icon}
      {children}
      {iconRight}
    </>
  );
  const isInternal = href.startsWith('/') && !external;
  if (isInternal) {
    return (
      <Link to={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  const opensNewTab = external ?? /^https?:/.test(href);
  return (
    <a
      href={href}
      className={classes}
      {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {content}
      {opensNewTab && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
