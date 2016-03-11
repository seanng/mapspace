class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :name
      t.string :googleID
      t.string :website
      t.float :lat
      t.float :long
      t.boolean :open_now
      t.string :address
      t.string :phone_number
      t.string :image

      t.timestamps null: false
    end
  end
end
