class ReallyAddPlantIdToGardenSquares < ActiveRecord::Migration
  def change
    add_reference :garden_squares, :plant, index: true
  end
end
