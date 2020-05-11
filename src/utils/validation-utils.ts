export function validateAmount(amount: string) {
  if (amount === '') {
    return 0
  }

  const parsedAmount = parseFloat(amount)
  const numeric = amount.match(/^[0-9\-\.]+$/i)
  if (!numeric || amount == null || isNaN(parsedAmount)) {
    return false
  }

  return roundAmount(parsedAmount)
}

export function roundAmount(amount: number) {
  return Math.round((amount + Number.EPSILON) * 100) / 100
}
