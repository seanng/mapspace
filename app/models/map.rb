class Map < ActiveRecord::Base
  has_many :comments
  has_many :likes
  has_many :places, through: :pins
  has_many :pins

  belongs_to :user
end
