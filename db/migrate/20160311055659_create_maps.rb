class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.string :title
      t.text :description
      t.integer :user_id
      t.boolean :featured
      t.text :tags, array: true, default: []

      t.timestamps null: false
    end
  end
end
