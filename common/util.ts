
export function objToGrahqlStr(obj: any): string {
  const str = JSON.stringify(obj);
  return str.replace(/\"([^(\")"]+)\":/g, '$1:');
}

export function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2)}`.replace('.', ',');
}
