class SetDefaultUserCaption < ActiveRecord::Migration
  def change
    change_column :users, :caption, :string, :default => "Hey, check out my maps!"
  end
end
