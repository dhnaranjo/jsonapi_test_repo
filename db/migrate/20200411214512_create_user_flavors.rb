class CreateUserFlavors < ActiveRecord::Migration[6.0]
  def change
    create_table :user_flavors do |t|
      t.references :user, null: false, foreign_key: true
      t.references :flavor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
