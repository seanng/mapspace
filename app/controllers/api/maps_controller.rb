module Api
  class MapsController < ApplicationController
    def user_maps

    end

    def index
      render json: Map.where(featured: true), :include => [:comments, :likes, :user]
    end

    def filter
      searchInput = params[:searchInput]
      puts searchInput

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
  end
end