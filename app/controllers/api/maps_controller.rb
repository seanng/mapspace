module Api
  class MapsController < ApplicationController
    def user_maps

    end

    def index

    end

    def filter
      searchInput = params[:searchInput]

      searchResults = [];
      searchResults << Map.where('LOWER(title) LIKE ?', "%#{searchInput.downcase}%")
      searchResults << Map.where('LOWER(description) LIKE ?', "%#{searchInput.downcase}%")
      puts searchResults

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