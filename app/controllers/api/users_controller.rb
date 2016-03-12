module API
  class UsersController < ApplicationController

  def show
    render 'show.jbuilder'
  end

  def image
    @email = @user.email

    @user =
    if @user.save

      # render 'show.jbuilder', :locals => {user: @user}
      render json: {email: @email, description: @description, }
    else

    end
  end

  private
    def user_params
      params.require(:user).permit(:image)
    end
  end
end