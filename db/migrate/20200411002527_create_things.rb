class CreateThings < ActiveRecord::Migration[6.0]
  def change
    create_table :things do |t|
      t.text :description
      t.boolean :private
      t.string :kinda
      t.references :user

      t.timestamps
    end
  end
end
