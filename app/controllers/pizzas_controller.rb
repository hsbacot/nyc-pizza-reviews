class PizzasController < ApplicationController
  def index

  end

  def reviews
    rs = ReviewScraper.new({
      restaurant: "dannys pizza",
      count: params[:count]
      })
    r = rs.get_reviews
    name = rs.get_name
    if !r.empty?
      ratings = r.map { |x| x.rating }
      avg = ratings.inject(0, :+) / ratings.size.to_f
    else
      avg = "N/A"
    end

    puts "avg #{avg}"
    render json: { reviews: r, average_rating: avg, restaurant: name }
  end
end
