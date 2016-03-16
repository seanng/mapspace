class ChangeTagsFromStringToArray < ActiveRecord::Migration
  def change
    remove_column :maps, :tags
    add_column :maps, :tags, :string, array: true, default: []
  end
end
