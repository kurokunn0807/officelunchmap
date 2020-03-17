class LunchMap::Page::TopController < LunchMapController
  def index
    @posts = Post.all.order(created_at: :desc)

    @lunches = Lanch.all.order(id: :asc)

    @firsts = Lanch.where(adress: :first)
    @seconds = Lanch.where(adress: :second)
    @thirds = Lanch.where(adress: :third)
    @fouths = Lanch.where(adress: :fouth)
    
  end

  def create
    @lunch = Lanch.new(name: params[:name],kind: :shop)
    if params[:image]
      image = params[:image]
      @lunch.image = "#{(0...8).map{ (65 + rand(26)).chr }.join}.jpg"
      File.binwrite("public/lunch_map/lunch/#{@lunch.image}",image.read)
      # 
####
      ### 画像の送信のみエラー発生
####
# 
    end

    if params[:comment]
      @lunch.comment = params[:comment]
    end

    if params[:adressX] && params[:adressX] && params[:adressY] && params[:adress]
      @lunch.adressX = params[:adressX]
      @lunch.adressY = params[:adressY]
      @lunch.adress = params[:adress]
        if @lunch.save
        flash[:notice] = "ピンの設置に成功しました"
        redirect_to("/page/top/index")
        else
        flash[:notice] = "ピンの設置に失敗しました"
        redirect_to("/page/top/index")
        end 
      else
      flash[:notice] = "必須項目が入力されていません"
      redirect_to("/page/top/index")
    end
  end
end
  