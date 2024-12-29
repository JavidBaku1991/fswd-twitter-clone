class StaticPagesController < ApplicationController
  def home
    if params[:path] == 'feed'
      render 'feed'
    else
      respond_to do |format|
        format.html { render 'home' }
        format.any { head :not_found }
      end
    end
  end

  def feed
    render 'feed'
  end

  def user_page
    render 'user_page'
  end
end