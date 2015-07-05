class RenameGardenSquareToPlanting < ActiveRecord::Migration
  def change
    rename_table :garden_squares, :plantings
    remove_column :plantings, :column
    remove_column :plantings, :row
    add_column :plantings, :top, :decimal
    add_column :plantings, :left, :decimal
    add_column :plantings, :right, :decimal
    add_column :plantings, :bottom, :decimal
  end
end
