/**
 * Разделяет число проблемами по тысячам,
 * например 10000 преобразует в "10 000"
 */
export function numberSeparatedBySpaces(amount: number | string | null) {
  if (amount === null) return null;
  const numberValue = typeof amount === "string" ? parseFloat(amount) : amount;
  if (!isFinite(numberValue)) return null;
  return String(numberValue).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$& ");
}
