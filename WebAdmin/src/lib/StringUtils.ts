
export function formatCurrency(value) {
  if (!value)
    return '';

  const opts = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  return value.toLocaleString('pt-BR', opts);
}