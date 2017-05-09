require 'nokogiri'
require 'open-uri'

Review = Struct.new(:review_text, :rating)

class ReviewScraper
  def initialize(params)
    @restaurant = params[:restaurant]
    @count = params[:count].to_i
    @info = self.get_info
  end

  def get_reviews
    puts "scraping from https://www.yelp.com#{@info[:url]}"
    response = open("https://www.yelp.com/#{@info[:url]}", "User-Agent" => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36")
    reviews = []
    doc = Nokogiri::HTML(response)
    doc.css('.main-section .review-list .ylist > li .review').each do |item|
      if !item.css(".review-content > p").text.empty?
        stars = item.css('.review-content .biz-rating .i-stars').attr("class").value.gsub(/[^0-9]/, '').to_i
        r = Review.new(item.css('.review-content > p').text, stars)
        reviews.push(r) unless r.review_text.empty?
      end
    end
    reviews.size > @count ? reviews.slice(0, @count) : reviews
  end

  def get_info
    restaurant = @restaurant.gsub!(" ", "+")
    response = open("http://www.yelp.com/search?find_desc=#{restaurant}&find_loc=New+York%2C+NY&ns=1", "User-Agent" => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36")
    doc = Nokogiri::HTML(response)
    link = doc.css('.results-wrapper .search-result-title .indexed-biz-name .biz-name').attr("href")
    name = doc.at('.results-wrapper .search-result-title .indexed-biz-name .biz-name').text
    { url: link, name: name }
  end

  def get_name
    puts @info
    @info[:name]
  end

end
