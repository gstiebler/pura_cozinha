
export function objToGrahqlStr(obj: any): string {
  const str = JSON.stringify(obj, null, 2);
  return str.replace(/\"([^(\")"]+)\":/g, '$1:');
}

export function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2)}`.replace('.', ',');
}
