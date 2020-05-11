import React, { useEffect, useState } from 'react'
import { List } from 'immutable'
import useSWR from 'swr'

import Wallet from '../entities/wallet'
import { Currency } from '../entities/currency'

import Arrow from './Arrow'
import WalletsProvider from './WalletsProvider'
import WalletsView from './WalletsView'

const API_URL = 'https://api.exchangeratesapi.io/latest'
const API_REFRESH_INTERVAL = 10000

const fetcher = async (key: string) => {
  const response = await fetch(`${API_URL}${key}`)
  return await response.json()
}

const CurrencyConverter: React.FC<{}> = () => {
  const [
    { rate, sourceWalletCurrency, targetWalletCurrency },
    setState,
  ] = useState({
    rate: 1,
    sourceWalletCurrency: Currency.GBP,
    targetWalletCurrency: Currency.USD,
  })
  const { data, error } = useSWR(`?base=${sourceWalletCurrency}`, fetcher, {
    refreshInterval: API_REFRESH_INTERVAL,
  })

  useEffect(() => {
    const rate = data && data.rates && data.rates[targetWalletCurrency]
    if (!rate) {
      return
    }

    setState((prevState) => ({
      ...prevState,
      rate,
    }))
  }, [data])

  const handleSourceWalletCurrencyChange = (currency: Currency) => {
    setState((prevState) => {
      const rate =
        sourceWalletCurrency === currency ? prevState.rate : 1 / prevState.rate
      return {
        ...prevState,
        rate,
        sourceWalletCurrency: currency,
      }
    })
  }

  const handleTargetWalletCurrencyChange = (currency: Currency) => {
    setState((prevState) => {
      const rate =
        (data && data.rates && data.rates[currency]) || prevState.rate
      return {
        ...prevState,
        rate,
        targetWalletCurrency: currency,
      }
    })
  }

  return (
    <WalletsProvider>
      {({ wallets }: { wallets: List<Wallet> }) => (
        <WalletsView
          rate={rate}
          wallets={wallets}
          sourceWalletCurrency={sourceWalletCurrency}
          targetWalletCurrency={targetWalletCurrency}
          onSourceWalletChange={handleSourceWalletCurrencyChange}
          onTargetWalletChange={handleTargetWalletCurrencyChange}
        />
      )}
    </WalletsProvider>
  )
}

export default CurrencyConverter
