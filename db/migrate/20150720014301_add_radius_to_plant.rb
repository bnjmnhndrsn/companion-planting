class AddRadiusToPlant < ActiveRecord::Migration
  def change
    add_column :plants, :radius, :integer
  end
end
