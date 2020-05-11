import chai, { expect } from 'chai'
import chaiSinon from 'sinon-chai'
import chaiJestSnapshot from 'chai-jest-snapshot'
import { shallow } from 'enzyme'
import React from 'react'
import { spy } from 'sinon'
import { List } from 'immutable'

import { Currency } from '../../src/entities/currency'
import Wallet from '../../src/entities/wallet'
import WalletView from '../../src/components/WalletView'

chai.use(chaiJestSnapshot)
chai.use(chaiSinon)

describe('WalletView', () => {
  const createWalletView = (
    props: Object = {},
    type: 'source' | 'target' = 'source'
  ) => {
    const wallet = new Wallet({ currency: Currency.EUR, amount: 0 })
    const wallet2 = new Wallet({ currency: Currency.USD, amount: 0 })
    const defaultProps = {
      wallet,
      wallets: List.of(wallet, wallet2),
      exchangeAmount: 0,
      exchangeRate: 1,
      exchangeCurrency: Currency.EUR,
      onAmountChange: () => {},
      onWalletChange: () => {},
    }
    const switcher = <WalletView type={type} {...defaultProps} {...props} />
    return shallow(switcher)
  }

  it('should render source WalletView', () => {
    const wrapper = createWalletView()
    expect(wrapper).to.matchSnapshot()
  })

  it('should render target WalletView', () => {
    const wrapper = createWalletView({}, 'target')
    expect(wrapper).to.matchSnapshot()
  })

  it('should handle wallet amount change', () => {
    const onAmountChange = spy()
    const wrapper = createWalletView({ onAmountChange })

    const props: any = wrapper.find('ConversionPart').props()
    props.onAmountChangeRequest({ persist: () => {}, target: { value: '42' } })

    expect(onAmountChange).to.have.been.called
  })

  it('should not handle wallet amount change for invalid input', () => {
    const onAmountChange = spy()
    const wrapper = createWalletView({ onAmountChange })

    const props: any = wrapper.find('ConversionPart').props()
    props.onAmountChangeRequest({
      persist: () => {},
      target: { value: '42asd' },
    })

    expect(onAmountChange).to.not.have.been.called
  })

  it('should handle wallet switch click', () => {
    const onWalletChange = spy()
    const wrapper = createWalletView({ onWalletChange })

    const props: any = wrapper.find('Switcher').props()
    props.onSwitchRequest(Currency.USD)

    expect(onWalletChange).to.have.been.calledOnceWith(Currency.USD)
  })
})
