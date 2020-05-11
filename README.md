# Currency exchange app

![build](https://github.com/jakubzitny/currency-exchange/workflows/build/badge.svg) [![codecov](https://codecov.io/gh/jakubzitny/currency-exchange/branch/master/graph/badge.svg)](https://codecov.io/gh/jakubzitny/currency-exchange)

Exchange currencies live like you would do in your Revolut app. Try it [live](https://currency-exchange.jakubzitny.now.sh/).

![demo](https://user-images.githubusercontent.com/3315662/81607806-924c1c00-93d5-11ea-859a-fb4f5111efd5.gif)


### Possible improvements

- better ui/ux (with shortcuts (up/down arrow), actual wallets that persist balance)
- better API calls encapsulation, more API providers
- performance optimizations (no useless rerenders)
- more tests for the root CurrencyConverter component
- integration tests with Cypress

### Stack

- TypeScript, NPM
- React (with React Hooks)
- [Next.js](https://nextjs.org/) (with [SWR](https://swr.now.sh/))
- Prettier, TSLint
- Jest (with Jest Snapshots), Chai, Sinon


### Development

1. Clone and install

```
git clone https://github.com/jakubzitny/currency-exchange
cd currency-exchange
npm i
```

2. Build it

```
npm run build
```

3. Check and test

```
npm test
npm run prettier
npm run lint
```

4. Run

```
npm start

# or npm run dev # for development mode
```
