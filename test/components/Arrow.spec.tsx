import chai, { expect } from 'chai'
import chaiJestSnapshot from 'chai-jest-snapshot'
import { shallow } from 'enzyme'
import React from 'react'

import Arrow from '../../src/components/Arrow'

chai.use(chaiJestSnapshot)

describe('Arrow', () => {
  it('should render Arrow', () => {
    const arrow = <Arrow />
    const wrapper = shallow(arrow)

    expect(wrapper).to.matchSnapshot()
  })
})
