class CreateFears < ActiveRecord::Migration[6.0]
  def change
    create_table :fears do |t|
      t.string :label

      t.timestamps
    end
  end
end
