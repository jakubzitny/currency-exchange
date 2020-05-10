import classNames from 'classnames'
import { List } from 'immutable'
import { v4 } from 'uuid'

import { Currency } from '../utils/currency-signs'

import styles from '../styles/Switcher.module.css'

type Props = {
  wallets: List<Currency>
  activeWallet: Currency
  type: 'source' | 'target'
}

export default function Switcher(props: Props) {
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
            [styles.switchDotActive]: wallet === props.activeWallet,
          })}
        />
      ))}
    </div>
  )
}
