import { Currency } from '../entities/currency'

export function getCurrencySymbol(currency: Currency) {
  if (currency === 'USD') {
    return '$'
  }

  if (currency === 'GBP') {
    return '£'
  }

  if (currency === 'EUR') {
    return '€'
  }

  return ''
}
