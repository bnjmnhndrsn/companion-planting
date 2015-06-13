class CreateGardenSquares < ActiveRecord::Migration
  def change
    create_table :garden_squares do |t|

      t.timestamps
    end
  end
end
