import React from 'react'
import classNames from 'classnames'
import { List } from 'immutable'
import { v4 } from 'uuid'

import { Currency } from '../entities/currency'
import Wallet from '../entities/wallet'

import styles from '../styles/Switcher.module.css'

type Props = {
  wallets: List<Wallet>
  activeWallet: Currency
  type: 'source' | 'target'
  onSwitchRequest: (currency: Currency) => void
}

export default function Switcher(props: Props) {
  const handleSwitchClick = (
    currency: Currency,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    props.onSwitchRequest(currency)
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerTarget]: props.type === 'target',
      })}
    >
      {props.wallets.toArray().map((wallet) => (
        <div
          key={v4()}
          className={classNames(styles.switchDot, {
            [styles.switchDotActive]:
              wallet.get('currency') === props.activeWallet,
          })}
          onClick={handleSwitchClick.bind(null, wallet.get('currency'))}
        />
      ))}
    </div>
  )
}
