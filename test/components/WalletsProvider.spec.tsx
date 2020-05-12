import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import { Currency } from '../../src/entities/currency'
import WalletsProvider from '../../src/components/WalletsProvider'

describe('WalletsProvider', () => {
  it('should provide default wallets to children', (callback) => {
    shallow(
      <WalletsProvider>
        {({ wallets }) => {
          expect(wallets.size).to.equal(3)
          callback()

          return <div />
        }}
      </WalletsProvider>
    )
  })


  it('should handle amount change and correctly update wallets amounts', (callback) => {
    let calls = 0
    const wrapper = shallow(
      <WalletsProvider>
        {({ wallets, onAmountChange }) => {
          if (calls++ == 0) {
            onAmountChange(
              Currency.EUR,
              Currency.USD,
              10,
              15
            )
          } else {
            const eurWallet = wallets.find((wallet) => {
              return wallet.get('currency') === Currency.EUR
            })
            const usdWallet = wallets.find((wallet) => {
              return wallet.get('currency') === Currency.USD
            })
            if (!eurWallet || !usdWallet) {
              // @ts-ignore
              callback.fail()
              return <div />
            }

            expect(eurWallet.get('amount')).to.equal(106.12)
            expect(usdWallet.get('amount')).to.equal(15)
            callback()
          }

          return <div />
        }}
      </WalletsProvider>
    )

  })
})
