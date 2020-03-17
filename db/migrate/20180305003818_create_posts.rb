class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :content
      t.string :adress
      t.string :adressX
      t.string :adressY
      t.string :image

      t.timestamps null: false
    end
  end
end
