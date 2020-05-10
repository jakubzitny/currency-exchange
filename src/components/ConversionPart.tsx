import classNames from 'classnames'

import { Currency, getCurrencySymbol } from '../utils/currency-signs'

import styles from '../styles/ConversionPart.module.css'

type Props = {
  currency: Currency
  exchangeAmount: number
  walletAmount: number
  rate: number
  rateCurrency: Currency
  type: 'source' | 'target'
}

export default function ConversionPart(props: Props) {
  return (
    <div
      className={classNames(styles.container, {
        [styles.containerTarget]: props.type === 'target',
      })}
    >
      <div className={styles.exchangeInfo}>
        <div className={styles.exchangeInfoCurrency}>{props.currency}</div>
        <div className={styles.exchangeInfoAmount}>
          {props.type === 'source' ? '-' : ''}
          {props.exchangeAmount}
        </div>
      </div>

      <div className={styles.walletInfo}>
        <div className={styles.walletInfoAmount}>
          You have {getCurrencySymbol(props.currency)}
          {props.walletAmount}
        </div>
        {props.type === 'target' && (
          <div className={styles.rate}>
            {getCurrencySymbol(props.currency)}1 ={' '}
            {getCurrencySymbol(props.rateCurrency)}
            {props.rate}
          </div>
        )}
      </div>
    </div>
  )
}
