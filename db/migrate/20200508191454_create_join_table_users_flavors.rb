class CreateJoinTableUsersFlavors < ActiveRecord::Migration[6.0]
  def change
    create_join_table :users, :flavors do |t|
      t.index [:user_id, :flavor_id]
      t.index [:flavor_id, :user_id]
    end
  end
end
