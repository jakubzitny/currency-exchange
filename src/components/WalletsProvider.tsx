import React, { useState, ReactElement } from 'react'
import { List } from 'immutable'

import { Currency } from '../entities/currency'
import Wallet from '../entities/wallet'
import { roundAmount } from '../utils/validation-utils'

type Props = {
  children: ({
    wallets,
    onAmountChange,
  }: {
    wallets: List<Wallet>
    onAmountChange: (
      sourceCurrency: Currency,
      targetCurrency: Currency,
      sourceAmount: number,
      targetAmount: number
    ) => void
  }) => ReactElement
}

const WalletsProvider: React.FC<Props> = (props: Props) => {
  const eurWallet = new Wallet({ currency: Currency.EUR, amount: 116.12 })
  const dollarWallet = new Wallet({ currency: Currency.USD, amount: 0 })
  const poundWallet = new Wallet({ currency: Currency.GBP, amount: 58.33 })
  const initialWallets: List<Wallet> = List.of(
    poundWallet,
    eurWallet,
    dollarWallet
  )

  const [wallets, updateWallets] = useState(initialWallets)

  const onAmountChange = (
    sourceCurrency: Currency,
    targetCurrency: Currency,
    sourceAmount: number,
    targetAmount: number
  ) => {
    const sourceWalletIndex = wallets.findIndex((wallet) => {
      return wallet.get('currency') === sourceCurrency
    })
    const targetWalletIndex = wallets.findIndex((wallet) => {
      return wallet.get('currency') === targetCurrency
    })
    const sourceWallet = wallets.get(sourceWalletIndex)
    const targetWallet = wallets.get(targetWalletIndex)
    if (!sourceWallet || !targetWallet || sourceCurrency === targetCurrency) {
      return
    }

    const changedSourceWallet = sourceWallet.set(
      'amount',
      roundAmount(sourceWallet.get('amount') - sourceAmount)
    )
    const changedTargetWallet = targetWallet.set(
      'amount',
      roundAmount(targetWallet.get('amount') + targetAmount)
    )
    const changedWallets = wallets
      .set(sourceWalletIndex, changedSourceWallet)
      .set(targetWalletIndex, changedTargetWallet)
    updateWallets(changedWallets)
  }

  return props.children({ wallets, onAmountChange })
}

export default WalletsProvider
