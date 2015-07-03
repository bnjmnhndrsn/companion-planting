class CreatePlants < ActiveRecord::Migration
  def change
    create_table :plants do |t|
      t.string :name, uniqueness: true, index: true

      t.timestamps
    end
  end
end
