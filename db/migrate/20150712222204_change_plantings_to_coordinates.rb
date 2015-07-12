class ChangePlantingsToCoordinates < ActiveRecord::Migration
  def change
    remove_column :plantings, :top
    remove_column :plantings, :left
    remove_column :plantings, :right
    remove_column :plantings, :bottom
    add_column :plantings, :i, :decimal
    add_column :plantings, :j, :decimal
    add_column :plantings, :radius, :decimal
  end
end
