class AddPlantIdToGardenSquare < ActiveRecord::Migration
  def change
    add_foreign_key :garden_squares, :plants
  end
end
