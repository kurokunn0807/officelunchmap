class LunchMap::PageController < LunchMapController 

  def action_missing(action_name,*args)
    begin
      options = {}
      options[:template] = "page/#{params[:directory]}/#{params[:action] || 'index'}"
      options[:layout] = "front_pop_win" if action_name == "form"
      options[:layout] = "front_pop_win" if action_name == :mobile

      render options

    rescue => e
      ExceptionNotifier.notify_exception(e)

    end
  end
end