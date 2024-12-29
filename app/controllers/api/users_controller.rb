module Api 
  class UsersController < ApplicationController

    def create
      @user = User.new(user_params)

      if @user.save 
        render json: {
          user: {
            username: @user.username
          }
        }
      else 
        @user.errors.full_messages.each do |message|
          @errorMessage = message
        end
        render json: { success: false, error: @errorMessage }
      end
    end

    private

    def user_params
      params.require(:user).permit(:username, :email, :password)
    end

  end
end