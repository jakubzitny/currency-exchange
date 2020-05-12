import chai, { expect } from 'chai'
import chaiJestSnapshot from 'chai-jest-snapshot'
import { mount, shallow } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'

import CurrencyConverter from '../../src/components/CurrencyConverter'

chai.use(chaiJestSnapshot)

describe('CurrencyConverter', () => {
  it('should render CurrencyConverter', () => {
    const arrow = <CurrencyConverter />
    const wrapper = shallow(arrow)

    expect(wrapper).to.matchSnapshot()
  })

  it('should fully render CurrencyConverter', (callback) => {
    const arrow = <CurrencyConverter />
    act(() => {
      const wrapper = mount(arrow)
      expect(wrapper).to.matchSnapshot()
      callback()
    })
  })
})
