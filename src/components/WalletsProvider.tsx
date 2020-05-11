import React, { ReactElement } from 'react'
import { List } from 'immutable'

import { Currency } from '../entities/currency'
import Wallet from '../entities/wallet'

type Props = {
  children: ({ wallets }: { wallets: List<Wallet> }) => ReactElement
}

const WalletsProvider: React.FC<Props> = (props: Props) => {
  const eurWallet = new Wallet({ currency: Currency.EUR, amount: 116.12 })
  const dollarWallet = new Wallet({ currency: Currency.USD, amount: 0 })
  const poundWallet = new Wallet({ currency: Currency.GBP, amount: 58.33 })

  const wallets: List<Wallet> = List.of(poundWallet, eurWallet, dollarWallet)

  return props.children({ wallets })
}

export default WalletsProvider
