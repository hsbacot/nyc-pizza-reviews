// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Review from './Review'

export class PizzaSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      averageRating: '',
      restaurantSearch: '',
      restaurant: '',
      reviewCount: 5,
      loadingReviews: false
    }

    this.getReviews = this.getReviews.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleNumericInput = this.handleNumericInput.bind(this)
  }

  getReviews(restaurant, count) {
    return fetch(`/pizzas/reviews?count=${count}&restaurant=${restaurant}`)
      .then(res => res.json())
  }

  handleInput(e) {
    this.setState({
      restaurantSearch: e.target.value
    })
  }

  handleSearch() {
    this.setState({
      restaurantSearch: '',
      reviewCount: 0,
      loadingReviews: true
    })
    this.getReviews(this.state.restaurantSearch, this.state.reviewCount).then(res => {
      this.setState({
        reviews: res.reviews,
        restaurant: res.restaurant,
        averageRating: res.average_rating,
        loadingReviews: false
      })
    })
  }

  handleNumericInput(e) {
    this.setState({
      reviewCount: e.target.value
    })
  }

  render() {
    const {
      averageRating,
      restaurantSearch,
      restaurant,
      reviewCount,
      reviews,
      loadingReviews
    } = this.state;

    const reviewItems = reviews.map(review => <Review copy={review.review_text} rating={review.rating} />)

    return(
      <div>
        <h2>NYC Pizza Reviews</h2>
        <p>Find pizzaria</p>
        <input value={restaurantSearch} onChange={this.handleInput} />
        <p>Number of reviews to fetch</p>
        <input type="number" value={reviewCount} onChange={this.handleNumericInput} />
        <button onClick={this.handleSearch}>Get Reviews</button>
        { restaurant && <h3>{restaurant} - average user rating: {averageRating}</h3>}
        { !isEmpty(reviews) && reviewItems}
        { loadingReviews && <p>loading...</p>}
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PizzaSearch />,
    document.body.appendChild(document.createElement('div')),
  )
})
