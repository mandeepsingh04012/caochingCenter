/**
 * Reads an optional value from the Vite environment.
 * Empty strings and whitespace are treated as "not configured" (null).
 */
export function readEnv(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
