export function generateShortCode(length = 7): string {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) out += alphabet[arr[i] % alphabet.length];
  return out;
}

export function buildRedirectUrl(shortCode: string): string {
  if (typeof window === "undefined") return `/r/${shortCode}`;
  return `${window.location.origin}/r/${shortCode}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
