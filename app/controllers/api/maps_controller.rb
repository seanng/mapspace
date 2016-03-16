module Api
  class MapsController < ApplicationController
    before_action :get_user, only: [:user_maps]
    def user_maps
      render json: @user.maps.includes(:comments, :likes, :user), :include => [:comments, :likes, :user]
    end

    def index
      render json: Map.includes(:comments, :likes, :user).where(featured: true).order(created_at: :desc), :include => [:comments, :likes, :user]
    end

    def get_popular_maps
      render json: Map.joins("left outer join likes on maps.id = likes.map_id").where(featured: true).group("maps.id").order("count(likes.id) DESC"), :include => [:comments, :likes, :user]
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
      tags = params[:tags]

      User.find(user_id).maps.create(title: map_title, description: map_description, featured: featured, tags: tags)

      all_pins.each do |pin|
        puts pin
        name = pin[:name]
        puts name
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

      render json: Map.last.id

    end

    def show
      map_id = params[:id].to_i
      map = Map.includes(:user, :places, :likes, pins: [:place], comments: [:user]).find(map_id)
      maps_json = map.as_json(include: [:user, :places, :likes, pins: {include: :place},comments: {include: {user: {only: :name}}}])
      maps_json["grouped_pins"] = maps_json["pins"].group_by{|p| p["category"]}

      render json: maps_json
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