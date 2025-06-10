export function formatCountNumber(num?: number | null): string {
  if (num === null || num == undefined) return "NaN";

  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "m";

  if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";

  return num.toString();
}
