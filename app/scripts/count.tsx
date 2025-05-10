export function formatCountNumber(num?: number | null): string {
    if (!num) return "";  // 0, null, undefined 모두 걸러짐
    return (num < 1000) ? num.toString() : (num / 1000).toFixed(1) + 'k';
  }