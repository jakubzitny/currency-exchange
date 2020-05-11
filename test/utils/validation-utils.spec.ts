import { expect } from 'chai'

import { Currency } from '../../src/entities/currency'
import { validateAmount, roundAmount } from '../../src/utils/validation-utils'

describe('validation utils', () => {
  describe('roundAmount', () => {
    it('should round value to two decimals', () => {
      expect(roundAmount(1.123)).to.equal(1.12)
    })

    it('should round 1.005 to 0.01', () => {
      expect(roundAmount(1.005)).to.equal(1.01)
    })
  })

  describe('validateAmount', () => {
    it('should mark empty string as ok', () => {
      const validation = validateAmount('')
      expect(validation).to.not.equal(false)
    })

    it('should mark 123 as ok', () => {
      const validation = validateAmount('123')
      expect(validation).to.not.equal(false)
    })

    it('should mark 123.444 as ok', () => {
      const validation = validateAmount('123.444')
      expect(validation).to.not.equal(false)
    })

    it('should mark asd as not ok', () => {
      const validation = validateAmount('asd')
      expect(validation).to.equal(false)
    })
  })
})
