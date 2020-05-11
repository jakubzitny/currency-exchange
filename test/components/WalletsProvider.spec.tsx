import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import WalletsProvider from '../../src/components/WalletsProvider'

describe('WalletsProvider', () => {
  it('should provide default wallets to children', (callback) => {
    shallow(
      <WalletsProvider>
        {({ wallets }) => {
          expect(wallets.size).to.equal(3)
          callback()

          return <div />
        }}
      </WalletsProvider>
    )
  })
})
