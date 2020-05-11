import { expect } from 'chai'

import { Currency } from '../../src/entities/currency'
import { getCurrencySymbol } from '../../src/utils/currency-signs'

describe('getCurrencySymbol', () => {
  it('should return $ symbol for USD', () => {
    expect(getCurrencySymbol(Currency.USD)).to.equal('$')
  })

  it('should return € symbol for EUR', () => {
    expect(getCurrencySymbol(Currency.EUR)).to.equal('€')
  })

  it('should return £ symbol for GBP', () => {
    expect(getCurrencySymbol(Currency.GBP)).to.equal('£')
  })
})
