import React from 'react'
import { List } from 'immutable'

import Wallet from '../entities/wallet'
import { Currency } from '../entities/currency'
import { validateAmount } from '../utils/validation-utils'

import ConversionPart from './ConversionPart'
import Switcher from './Switcher'

import styles from '../styles/WalletView.module.css'

type Props = {
  wallet: Wallet
  wallets: List<Wallet>
  exchangeAmount: number
  exchangeRate: number
  exchangeCurrency: Currency
  type: 'source' | 'target'
  onAmountChange: (amount: number) => void
  onWalletChange: (currency: Currency) => void
}

const WalletView: React.FC<Props> = (props: Props) => {
  const {
    exchangeAmount,
    exchangeCurrency,
    exchangeRate,
    type,
    wallet,
    wallets,
  } = props

  const handleAmountChangeRequest = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.persist()
    const validNextAmount = validateAmount(e.target.value)
    if (validNextAmount === false) {
      return
    }

    props.onAmountChange(validNextAmount)
  }

  return (
    <div className={styles.container}>
      <ConversionPart
        currency={wallet.currency}
        walletAmount={wallet.amount}
        exchangeAmount={exchangeAmount}
        rate={exchangeRate}
        rateCurrency={exchangeCurrency}
        type={type}
        onAmountChangeRequest={handleAmountChangeRequest}
      />
      <Switcher
        type={type}
        wallets={wallets}
        activeWallet={wallet.currency}
        onSwitchRequest={props.onWalletChange}
      />
    </div>
  )
}

export default WalletView
