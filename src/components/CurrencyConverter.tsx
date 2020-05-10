import { List } from 'immutable'

import Arrow from './Arrow'
import ConversionPart from './ConversionPart'
import Switcher from './Switcher'
import { Currency } from '../utils/currency-signs'

import styles from '../styles/CurrencyConverter.module.css'

export default function CurrencyConverter() {
  const wallets: List<Currency> = List.of('GBP', 'EUR', 'USD')

  return (
    <div className={styles.container}>
      <ConversionPart
        currency="GBP"
        walletAmount={58.33}
        exchangeAmount={50}
        rate={0.74}
        rateCurrency="GBP"
        type="source"
      />
      <Switcher type="source" wallets={wallets} activeWallet="GBP" />
      <Arrow />
      <ConversionPart
        currency="EUR"
        walletAmount={116.12}
        exchangeAmount={67.22}
        rate={0.74}
        rateCurrency="GBP"
        type="target"
      />
      <Switcher type="target" wallets={wallets} activeWallet="EUR" />
    </div>
  )
}
