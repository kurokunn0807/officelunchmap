class AddRestrantName < ActiveRecord::Migration
  def change
    add_column :lanches, :name, :string
  end
end
