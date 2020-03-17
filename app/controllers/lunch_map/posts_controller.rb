class LunchMap::PostsController < LunchMapController
  protect_from_forgery :except => [:mark]
  def create
    @post = Post.new(content: params[:content])

    if params[:image]
      image = params[:image]
      @post.image_name = "#{(0...8).map{ (65 + rand(26)).chr }.join}.jpg"
      File.binwrite("public/lunch_map/post/#{@post.image_name}",image.read)
    end
    
    if @post.save
      flash[:notice] = "投稿しました"
      redirect_to("/page/top/index")
    else
      flash[:notice] = "内容が長すぎます。"
      redirect_to("/page/top/index") 
    end
  end

  def mark
    @address = Lanch.new(adress: params[:address],name: params[:name])
  if @address.save
    flash[:notice] = "マーカーを登録しました"
    redirect_to("/page/top/index")
  else
    flash[:notice] = "登録に失敗しました"
    redirect_to("/page/top/index")
  end
  end
end

