class Planting < ActiveRecord::Base
  belongs_to :garden
  belongs_to :plant
  validates :column, presence: true
  validates :row, presence: true
  validates :garden, presence: true
  # validate :garden_square_must_not_exist, :garden_square_in_garden, on: :create

 #  def garden_square_must_not_exist
 #   if self.garden.garden_squares.where(column: self.column, row: self.row).any?
 #     errors.add(:garden, "garden square already exists")
 #   end
 #  end
 #
 # def garden_square_in_garden
 #   if (self.column < 0 || self.row < 0 || self.garden.width <= self.column ||
 #      self.garden.height <= self.row)
 #      errors.add(:garden, "garden square not in garden")
 #    end
 #  end

  def get_suggestions
    num = self.id % Plant.count
    Plant.order("ABS(id - #{num})").limit(3)
  end

end
