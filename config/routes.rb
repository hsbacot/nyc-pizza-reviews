Rails.application.routes.draw do
  get 'pizzas/index'
  get 'pizzas/reviews'

  root to: 'pizzas#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
