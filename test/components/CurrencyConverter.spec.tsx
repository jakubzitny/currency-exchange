import chai, { expect } from 'chai'
import chaiJestSnapshot from 'chai-jest-snapshot'
import { shallow } from 'enzyme'
import React from 'react'

import CurrencyConverter from '../../src/components/CurrencyConverter'

chai.use(chaiJestSnapshot)

describe('CurrencyConverter', () => {
  it('should render CurrencyConverter', () => {
    const arrow = <CurrencyConverter />
    const wrapper = shallow(arrow)

    expect(wrapper).to.matchSnapshot()
  })
})
