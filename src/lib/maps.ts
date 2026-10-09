/** Google Maps directions link for an address, with the address safely encoded. */
export function buildDirectionsUrl(address: string, placeUrl?: string | null): string {
  if (placeUrl) return placeUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}
