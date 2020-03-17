class AddImagePost < ActiveRecord::Migration
  def change
    add_column :posts, :image_name, :string
  end
end
