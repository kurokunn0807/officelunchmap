class CreateLanches < ActiveRecord::Migration
  def change
    create_table :lanches do |t|
      t.string :adress
      t.string :adressX
      t.string :adressY
      t.string :image

      t.timestamps null: false
    end
  end
end
