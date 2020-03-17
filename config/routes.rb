Rails.application.routes.draw do
  root "lunch_map/page/top#index"

  get  "/page/top/index"        => "lunch_map/page/top#index"
  get  "/page/lunch/index"      => "lunch_map/page/lunch#index"
  post "/page/top/lunch/create"     => "lunch_map/page/top#create"
  post "/page/top/posts/create" => "lunch_map/posts#create"
  post "/page/top/posts/mark"   => "lunch_map/posts#mark"


end
