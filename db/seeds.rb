15.times do
  password = Faker::Internet.password(8)
  user = User.create(email: Faker::Internet.email, name: Faker::Internet.user_name, password: password, password_confirmation: password)

  5.times do
    map = Map.create(title: Faker::Name.title, description: Faker::Lorem.sentence, user_id: user.id, featured: Faker::Boolean.boolean(0.1))

      10.times do
        Like.create(user_id: user.id, map_id: map.id)
      end

      5.times do
        Comment.create(user_id: user.id, map_id: map.id, comment: Faker::Lorem.sentence)
      end

      5.times do
        place = Place.create(name: Faker::Name.title)
        Pin.create(place_id: place.id, map_id: map.id)
      end

  end

end

