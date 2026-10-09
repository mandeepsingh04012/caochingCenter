import { useState } from 'react';
import { X } from 'lucide-react';
import { getMissingConfig } from '../../lib/contact';

/** Development-only reminder listing configuration that still needs values. */
export function DevConfigBanner() {
  const [dismissed, setDismissed] = useState(false);
  const missing = getMissingConfig();
  if (!import.meta.env.DEV || dismissed || missing.length === 0) return null;
  return (
    <div className="bg-gold-100 text-deep" role="note">
      <div className="container-page flex items-start gap-4 py-2.5 text-xs">
        <p className="flex-1">
          <strong>Development notice — not shown in production.</strong> Configure: {missing.join(' · ')}. See
          .env.example and src/config/.
        </p>
        <button type="button" onClick={() => setDismissed(true)} className="rounded p-1 hover:bg-gold/40">
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">Dismiss development notice</span>
        </button>
      </div>
    </div>
  );
}
