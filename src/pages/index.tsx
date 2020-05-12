import Head from 'next/head'

import CurrencyConverter from '../components/CurrencyConverter'
import { GA_TRACKING_ID } from '../utils/gtag'

export default function index() {
  return (
    <div className="container">
      <Head>
        <title>Currency Converter</title>
        <link rel="icon" href="/favicon.png" />
        <script
          async={true}
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `,
          }}
        />
      </Head>

      <main>
        <CurrencyConverter />
      </main>
    </div>
  )
}
