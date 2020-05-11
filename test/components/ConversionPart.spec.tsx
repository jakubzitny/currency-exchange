import chai, { expect } from 'chai'
import chaiSinon from 'sinon-chai'
import chaiJestSnapshot from 'chai-jest-snapshot'
import { shallow } from 'enzyme'
import React from 'react'
import { spy } from 'sinon'
import { List } from 'immutable'

import { Currency } from '../../src/entities/currency'
import Wallet from '../../src/entities/wallet'
import ConversionPart from '../../src/components/ConversionPart'

chai.use(chaiJestSnapshot)
chai.use(chaiSinon)

describe('ConversionPart', () => {
  const createConversionPart = (
    props: Object = {},
    type: 'source' | 'target' = 'source'
  ) => {
    const defaultProps = {
      currency: Currency.EUR,
      exchangeAmount: 50,
      walletAmount: 123,
      rate: 1.5,
      rateCurrency: Currency.USD,
      onAmountChangeRequest: () => {},
    }
    const switcher = <ConversionPart type={type} {...defaultProps} {...props} />
    return shallow(switcher)
  }

  it('should render source ConversionPart', () => {
    const wrapper = createConversionPart()
    expect(wrapper).to.matchSnapshot()
  })

  it('should render target ConversionPart', () => {
    const wrapper = createConversionPart({}, 'target')
    expect(wrapper).to.matchSnapshot()
  })

  it('should handle input change', () => {
    const onAmountChangeRequest = spy()
    const wrapper = createConversionPart({ onAmountChangeRequest })

    wrapper.find('input').simulate('change')
    expect(onAmountChangeRequest).to.have.been.called
  })
})
