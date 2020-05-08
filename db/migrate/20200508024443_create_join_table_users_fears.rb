class CreateJoinTableUsersFears < ActiveRecord::Migration[6.0]
  def change
    create_join_table :users, :fears do |t|
      t.index [:user_id, :fear_id]
      t.index [:fear_id, :user_id]
    end
  end
end
