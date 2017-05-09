import React from 'react'
import { PizzaSearch } from '../pizza_search'
// commented out due to webpack issues with enzyme dependencies and react updates
import { shallow } from 'enzyme'

const data = {"reviews":[{"review_text":"Awesome cheese pizza  - my go toEven though can not be your first choice, the caesar salad pizza is delicious ! Buffalo chicken pizza is also good","rating":4}],"average_rating":4.0,"restaurant":"Danny’s Pizzeria"}

describe('PizzaSearch', () => {
  it('should render PizzaSearch', () => {
    const component = shallow(<PizzaSearch />)
    expect(component).toMatchSnapshot()
  })

  it('should handle search input', () => {
    const component = shallow(<PizzaSearch />).instance()
    component.handleInput({ target: { value: 'dannys pizza' }})
    expect(component.state.restaurantSearch).toBe('dannys pizza')
  })

  it('should handle numerical input', () => {
    const component = shallow(<PizzaSearch />).instance()
    component.handleNumericInput({ target: { value: 3 }})
    expect(component.state.reviewCount).toBe(3)
  })

  it('should update the state to the response', async () => {
    const component = shallow(<PizzaSearch />).instance()
    const getReviewMock = jest.fn(() =>
      new Promise((resolve, reject) => resolve(data))
    );
    const setStateMock = jest.fn()
    component.getReviews = getReviewMock
    component.setState = setStateMock
    await component.handleSearch()
    expect(setStateMock.mock.calls.length).toBe(2);
    expect(setStateMock.mock.calls[1][0]).toHaveProperty('reviews', data.reviews)
    expect(setStateMock.mock.calls[1][0]).toHaveProperty('averageRating', 4)
    expect(setStateMock.mock.calls[1][0]).toHaveProperty('loadingReviews', false)
    expect(setStateMock.mock.calls[1][0]).toHaveProperty('restaurant')
  })

  it('should handle loading info', () => {
    const component = shallow(<PizzaSearch />).instance()
    component.setState({ loadingReviews: true })
    expect(component).toMatchSnapshot()
  })
})
