import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck, Info } from 'lucide-react';
import { cn } from '../../lib/cn';

type Tone = 'info' | 'success' | 'warning' | 'error';

const styles: Record<Tone, string> = {
  info: 'border-forest/15 bg-forest-50 text-deep',
  success: 'border-forest/25 bg-forest-50 text-deep',
  warning: 'border-gold/60 bg-gold-100 text-deep',
  error: 'border-danger/30 bg-danger-50 text-[#6e1f1a]',
};

const icons: Record<Tone, typeof Info> = { info: Info, success: CircleCheck, warning: CircleAlert, error: CircleAlert };

interface NoticeProps {
  tone?: Tone;
  title?: string;
  children?: ReactNode;
  className?: string;
  role?: 'status' | 'alert';
}

export function Notice({ tone = 'info', title, children, className, role }: NoticeProps) {
  const Icon = icons[tone];
  return (
    <div role={role} className={cn('flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed', styles[tone], className)}>
      <Icon aria-hidden="true" className={cn('mt-0.5 size-5 shrink-0', tone === 'error' ? 'text-danger' : 'text-forest')} />
      <div className="space-y-2">
        {title && <p className="font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  );
}
