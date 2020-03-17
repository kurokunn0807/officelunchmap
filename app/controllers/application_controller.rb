class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
private
  def current_action_name
    request.env['PATH_INFO'].split('/')[3]
  end
  helper_method :current_action_name
end

