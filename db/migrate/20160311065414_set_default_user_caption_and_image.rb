class SetDefaultUserCaptionAndImage < ActiveRecord::Migration
  def change
    change_column :users, :image, :string, :default => "http://www.hmhco.com/~/media/sites/home/at-home/featured-shops/by-brand/carmen-sandiego/cs%20returns%20app%20iconlphmh110915.png?h=308&la=en&w=308"
  end
end
