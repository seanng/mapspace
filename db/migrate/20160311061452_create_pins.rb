class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.text :description
      t.string :category
      t.integer :map_id
      t.integer :place_id

      t.timestamps null: false
    end
  end
end
