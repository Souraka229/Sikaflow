const intlFrInteger = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

/**
 * Montant en XOF, séparateurs conformes au français (espaces fines insécables).
 * Ex. 245000 → « 245 000 FCFA »
 */
export function formatXof(amount: number): string {
  return `${intlFrInteger.format(amount)}\u202fFCFA`;
}
