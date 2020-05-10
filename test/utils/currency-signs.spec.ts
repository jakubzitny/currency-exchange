import { expect } from 'chai'

import { getCurrencySymbol } from '../../src/utils/currency-signs'

describe('getCurrencySymbol', () => {
  it('should return $ symbol for USD', () => {
    expect(getCurrencySymbol('USD')).to.equal('$')
  })

  it('should return € symbol for EUR', () => {
    expect(getCurrencySymbol('EUR')).to.equal('€')
  })

  it('should return £ symbol for GBP', () => {
    expect(getCurrencySymbol('GBP')).to.equal('£')
  })
})
