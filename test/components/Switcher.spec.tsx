import chai, { expect } from 'chai'
import chaiSinon from 'sinon-chai'
import chaiJestSnapshot from 'chai-jest-snapshot'
import { shallow } from 'enzyme'
import React from 'react'
import { spy } from 'sinon'
import { List } from 'immutable'

import { Currency } from '../../src/entities/currency'
import Wallet from '../../src/entities/wallet'
import Switcher from '../../src/components/Switcher'

chai.use(chaiJestSnapshot)
chai.use(chaiSinon)

describe('Switcher', () => {
  const createSwitcher = (
    props: Object = {},
    type: 'source' | 'target' = 'source'
  ) => {
    const wallet = new Wallet({ currency: Currency.EUR, amount: 0 })
    const wallet2 = new Wallet({ currency: Currency.USD, amount: 0 })
    const defaultProps = {
      wallets: List.of(wallet, wallet2),
      activeWallet: Currency.EUR,
      onSwitchRequest: () => {},
    }
    const switcher = <Switcher type={type} {...defaultProps} {...props} />
    return shallow(switcher)
  }

  it('should render source Switcher', () => {
    const wrapper = createSwitcher()
    expect(wrapper).to.matchSnapshot()
  })

  it('should render target Switcher', () => {
    const wrapper = createSwitcher({}, 'target')
    expect(wrapper).to.matchSnapshot()
  })

  it('should handle wallet switch click', () => {
    const onSwitchRequest = spy()
    const wrapper = createSwitcher({ onSwitchRequest })

    wrapper.find('.switchDot').at(1).simulate('click')
    expect(onSwitchRequest).to.have.been.called
  })
})
