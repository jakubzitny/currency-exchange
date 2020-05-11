import classNames from 'classnames'
import React, { useState } from 'react'

import { getCurrencySymbol } from '../utils/currency-signs'
import { roundAmount } from '../utils/validation-utils'
import { Currency } from '../entities/currency'

import styles from '../styles/ConversionPart.module.css'

type Props = {
  currency: Currency
  exchangeAmount: number
  walletAmount: number
  rate: number
  rateCurrency: Currency
  type: 'source' | 'target'
  onAmountChangeRequest: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ConversionPart: React.FC<Props> = (props: Props) => {
  const { rate } = props

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerTarget]: props.type === 'target',
      })}
    >
      <div className={styles.exchangeInfo}>
        <div className={styles.exchangeInfoCurrency}>{props.currency}</div>
        <div className={styles.exchangeInfoAmount}>
          <input
            className={styles.input}
            value={props.exchangeAmount}
            onChange={props.onAmountChangeRequest}
          />
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
            {roundAmount(props.type === 'target' ? 1 / rate : rate)}
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversionPart
