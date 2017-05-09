import React from 'react'
import { Review } from '../Review'
// commented out due to webpack issues with enzyme dependencies and react updates
import { shallow } from 'enzyme'

describe('Review', () => {
  it('should render', () => {
    const component = shallow(<Review />);
    expect(component).toMatchSnapshot();
  })

  it('should handle copy and rating props', () => {
    const component = shallow(<Review copy="test review" rating={4} />);
    expect(component).toMatchSnapshot();
  })
})
