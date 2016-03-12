module Api
  class MapsController < ApplicationController
    def user_maps

    end

    def index

    end

    def filter
      puts "connected"
      logger.info("connected")
      searchInput = params[:searchInput]

      searchResults = [];
      searchResults << Map.where('title LIKE ?', "%#{@searchInput}%")
      searchResults << Map.where('description LIKE ?', "%#{@searchInput}%")

      render json: { searchResults: searchResults, searchInput: searchInput }
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