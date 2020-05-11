import { List } from 'immutable'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

import Arrow from './Arrow'
import WalletView from './WalletView'
import { Currency } from '../entities/currency'
import Wallet from '../entities/wallet'
import { roundAmount, validateAmount } from '../utils/validation-utils'

import styles from '../styles/WalletsView.module.css'

type Props = {
  rate: number
  wallets: List<Wallet>
  sourceWalletCurrency: Currency
  targetWalletCurrency: Currency
  onSourceWalletChange: (currency: Currency) => void
  onTargetWalletChange: (currency: Currency) => void
}

type State = {
  sourceWallet: Wallet
  targetWallet: Wallet
}

const WalletsView: React.FC<Props> = (props: Props) => {
  const { sourceWalletCurrency, targetWalletCurrency, wallets } = props
  const sourceWallet = wallets.find(
    (wallet) => wallet.get('currency') === sourceWalletCurrency
  )
  const targetWallet = wallets.find(
    (wallet) => wallet.get('currency') === targetWalletCurrency
  )
  if (!sourceWallet || !targetWallet) {
    throw new Error('Wallet misconfiguration!')
  }

  const [amountState, setAmountState] = useState({
    exchangeAmount: 50,
    exchangedAmount: props.rate ? roundAmount(50 * props.rate) : 67.22,
  })

  useEffect(() => {
    setAmountState((prevState) => ({
      ...prevState,
      exchangedAmount: roundAmount(props.rate * prevState.exchangeAmount),
    }))
  }, [props.rate])

  const handleSourceAmountChange = (amount: number) => {
    const exchangedAmount = roundAmount(amount * props.rate)
    setAmountState({ exchangeAmount: amount, exchangedAmount })
  }

  const handleTargetAmountChange = (amount: number) => {
    const exchangeAmount = roundAmount(amount / props.rate)
    setAmountState({ exchangeAmount, exchangedAmount: amount })
  }

  return (
    <div className={styles.container}>
      <WalletView
        exchangeAmount={amountState.exchangeAmount}
        exchangeCurrency={targetWallet.currency}
        exchangeRate={props.rate}
        wallet={sourceWallet}
        wallets={wallets}
        type="source"
        onAmountChange={handleSourceAmountChange}
        onWalletChange={props.onSourceWalletChange}
      />
      <Arrow />
      <WalletView
        exchangeAmount={amountState.exchangedAmount}
        exchangeCurrency={sourceWallet.currency}
        exchangeRate={props.rate}
        wallet={targetWallet}
        wallets={wallets}
        type="target"
        onAmountChange={handleTargetAmountChange}
        onWalletChange={props.onTargetWalletChange}
      />
    </div>
  )
}

export default WalletsView
