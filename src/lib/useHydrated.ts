import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * False during prerendering and the initial hydration pass, true afterwards.
 * Use for UI that depends on browser-only state (e.g. query strings) so the
 * hydrated markup matches the prerendered HTML.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
