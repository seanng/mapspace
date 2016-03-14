module Api
  class MapsController < ApplicationController
    before_action :get_user, only: [:user_maps]
    def user_maps

      render json: @user.maps.includes(:comments, :likes, :user), :include => [:comments, :likes, :user]
    end

    def index
      render json: Map.includes(:comments, :likes, :user).where(featured: true), :include => [:comments, :likes, :user]
    end

    def filter
      searchInput = params[:searchInput]

      render json: Map.where('LOWER(title) LIKE ? OR LOWER(description) LIKE ?', "%#{searchInput.downcase}%", "%#{searchInput.downcase}%"), :include => [:comments, :likes, :user]

    end

    def create

    end

    def show

    end

    def update

    end

    def destroy

    end

  private
    def get_user
      @user = User.find_by(id: params[:user_id])

      if @user.nil?
        render json: {message: "No such user"}
      end
    end
  end
end