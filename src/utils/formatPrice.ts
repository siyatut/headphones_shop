export function formatPrice(value: number) {
  return `₽ ${value.toLocaleString("ru-RU")}`;
}
