class UpdateMapTagToString < ActiveRecord::Migration
  def change
    change_column :maps, :tags, :string
  end
end
