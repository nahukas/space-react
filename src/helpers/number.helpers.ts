export const germanFormat = (originalNumber: number) =>
  new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(originalNumber);
