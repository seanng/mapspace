class RemoveDefaultFromUserTags < ActiveRecord::Migration
  def change
    change_column_default :maps, :tags, nil
  end
end
