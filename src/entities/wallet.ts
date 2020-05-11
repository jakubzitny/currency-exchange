import { Record } from 'immutable'
import { Currency } from './currency'

interface Defaults {
  currency: Currency
  amount: number
}

const defaults: Defaults = {
  currency: Currency.EUR,
  amount: 0,
}

export default class Wallet extends Record<Defaults>(defaults) {}
