class Place < ActiveRecord::Base
  has_many :maps, through: :pins
  has_many :pins
end
