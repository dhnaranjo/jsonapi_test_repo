class AddColumnsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string
    add_column :users, :street_address, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :phone_number, :string
    add_column :users, :six_paragraphs_of_text, :string
    add_column :users, :avatar, :string
  end
end
