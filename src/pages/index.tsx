import Head from 'next/head'

import CurrencyConverter from '../components/CurrencyConverter'

export default function index() {
  return (
    <div className="container">
      <Head>
        <title>Currency Converter</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <CurrencyConverter />
      </main>
    </div>
  )
}
