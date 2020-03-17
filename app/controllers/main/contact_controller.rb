class Main::ContactController < MainController
  def contact 
    @contact =Contact.new
    render "/main/contact/contact"
  end

  def back
    @contact = Contact.new(content: params[:contact][:content],name: params[:contact][:name],email: params[:contact][:email])
    render("main/contact/contact")
  end

  def confirmation
    @contact = Contact.new(content: params[:contact][:content],name: params[:contact][:name],email: params[:contact][:email])
    if @contact.valid?
      render("main/contact/confirmation")
    else
      @error_message="入力されていない項目があるかメールアドレスが間違っています。"
      render("main/contact/contact")
    end
  end

  def contacts
    @contact = Contact.new(content: params[:contact][:content],name: params[:contact][:name],email: params[:contact][:email])
    @contact.save
    redirect_to "/home/top"
    flash[:notice]=""
  end

end

