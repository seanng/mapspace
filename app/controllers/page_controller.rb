class PageController < ApplicationController
  def home

  end

  def filters
    params[:searchInput]
    searchResults = [];
    searchResults << Map.where('LOWER(title) LIKE ?', "%#{searchInput.downcase}%")
    searchResults << Map.where('LOWER(description) LIKE ?', "%#{searchInput.downcase}%")
  end

  def user_profile

  end

  def map_create

  end

  def map_show

  end

  def map_comments

  end
end
