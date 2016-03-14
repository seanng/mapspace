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
      user_id = params[:user_id].to_i
      map_title = params[:title]
      map_description = params[:description]
      featured = params[:featured]
      all_pins = params[:pins]

      User.find(user_id).maps.create(title: map_title, description: map_description, featured: featured)

      puts "hey"
      all_pins.each do |key, value|
        value.each do |pin|
          name = pin[:name]
          google_id = pin[:google_id]
          lat = pin[:lat]
          long = pin[:long]
          description = pin[:description]
          category = pin[:category]
          address = pin[:address]
          phone_number = pin[:phone_number]
          place = Place.find_or_create_by(name: name, googleID: google_id, lat: lat, long: long, address: address, phone_number: phone_number)
          Map.last.pins.create(description: description, category: category, place_id: place.id)
        end
      end

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