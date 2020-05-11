import chai, { expect } from 'chai'
import chaiSinon from 'sinon-chai'
import chaiJestSnapshot from 'chai-jest-snapshot'
import { shallow } from 'enzyme'
import React from 'react'
import { spy } from 'sinon'
import { List } from 'immutable'

import { Currency } from '../../src/entities/currency'
import Wallet from '../../src/entities/wallet'
import WalletsView from '../../src/components/WalletsView'

chai.use(chaiJestSnapshot)
chai.use(chaiSinon)

describe('WalletsView', () => {
  const createWalletsView = (props: Object = {}) => {
    const wallet = new Wallet({ currency: Currency.EUR, amount: 0 })
    const wallet2 = new Wallet({ currency: Currency.USD, amount: 0 })
    const defaultProps = {
      rate: 1,
      wallets: List.of(wallet, wallet2),
      sourceWalletCurrency: Currency.EUR,
      targetWalletCurrency: Currency.USD,
      onSourceWalletChange: () => {},
      onTargetWalletChange: () => {},
    }
    const switcher = <WalletsView {...defaultProps} {...props} />
    return shallow(switcher)
  }

  it('should render WalletsView', () => {
    const wrapper = createWalletsView()
    expect(wrapper).to.matchSnapshot()
  })

  it('should handle source wallet change', () => {
    const onSourceWalletChange = spy()
    const wrapper = createWalletsView({ onSourceWalletChange })

    const props: any = wrapper.find('WalletView').at(0).props()
    props.onWalletChange(Currency.USD)

    expect(onSourceWalletChange).to.have.been.calledOnceWith(Currency.USD)
  })

  it('should handle target wallet change', () => {
    const onTargetWalletChange = spy()
    const wrapper = createWalletsView({ onTargetWalletChange })

    const props: any = wrapper.find('WalletView').at(1).props()
    props.onWalletChange(Currency.USD)

    expect(onTargetWalletChange).to.have.been.calledOnceWith(Currency.USD)
  })

  it('should handle source amount change and adapt exchange amounts accordingly', () => {
    const rate = 1.5
    const wrapper = createWalletsView({ rate })

    const props: any = wrapper.find('WalletView').at(0).props()
    props.onAmountChange(50)

    const updatedSourceWalletViewProps: any = wrapper
      .find('WalletView')
      .at(0)
      .props()
    const updatedTargetWalletViewProps: any = wrapper
      .find('WalletView')
      .at(1)
      .props()

    expect(updatedSourceWalletViewProps.exchangeAmount).to.equal(50)
    expect(updatedTargetWalletViewProps.exchangeAmount).to.equal(75)
  })

  it('should handle source amount change and adapt exchange amounts accordingly', () => {
    const rate = 0.8
    const wrapper = createWalletsView({ rate })

    const props: any = wrapper.find('WalletView').at(1).props()
    props.onAmountChange(50)

    const updatedSourceWalletViewProps: any = wrapper
      .find('WalletView')
      .at(0)
      .props()
    const updatedTargetWalletViewProps: any = wrapper
      .find('WalletView')
      .at(1)
      .props()

    expect(updatedSourceWalletViewProps.exchangeAmount).to.equal(62.5)
    expect(updatedTargetWalletViewProps.exchangeAmount).to.equal(50)
  })
})
