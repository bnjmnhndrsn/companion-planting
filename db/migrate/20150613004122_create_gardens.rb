class CreateGardens < ActiveRecord::Migration
  def change
    create_table :gardens do |t|
      t.string :title
      t.integer :height
      t.integer :width
      
      t.timestamps
    end
  end
end
