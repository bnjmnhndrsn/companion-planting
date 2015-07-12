class Planting < ActiveRecord::Base
  belongs_to :garden
  belongs_to :plant
  validates :garden, presence: true

  def get_suggestions
    num = self.id % Plant.count
    Plant.order("ABS(id - #{num})").limit(3)
  end

end
