import React from 'react'
import PropTypes from 'prop-types'

export const Review = ({ copy, rating }) => (
  <div>
    <p>{copy}</p>
    <p>User Rating: {rating}</p>
  </div>
)

export default Review
