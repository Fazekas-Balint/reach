export const money = (amount: number, currency: 'EUR' | 'USD' = 'EUR') =>
  new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);

export const shortMoney = (amount: number, currency: 'EUR' | 'USD' = 'EUR') => {
  const sym = currency === 'EUR' ? '€' : '$';
  if (amount >= 1_000_000) return `${sym}${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `${sym}${Math.round(amount / 1_000)}k`;
  return `${sym}${amount}`;
};

export const relTime = (iso: string | null) => {
  if (!iso) return 'never';
  const then = new Date(iso).getTime();
  const now = Date.now();
  const s = Math.round((now - then) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};
