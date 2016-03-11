10.times do
  password = Faker::Internet.password(8)
  user = User.create(email: Faker::Internet.email, password: password, password_confirmation: password)

  5.times do
    Map.create(title: Faker::Name.title, description: Faker::Lorem.sentence, user_id: user.id)
  end
end

