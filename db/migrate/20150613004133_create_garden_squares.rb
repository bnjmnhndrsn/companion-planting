class CreateGardenSquares < ActiveRecord::Migration
  def change
    create_table :garden_squares do |t|
      t.integer :garden_id
      t.integer :column
      t.integer :row
      
      t.timestamps
    end
  end
end
