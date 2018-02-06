
export function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2)}`.replace('.', ',');
}
