# == Schema Information
#
# Table name: plantings
#
#  id         :integer          not null, primary key
#  garden_id  :integer
#  created_at :datetime
#  updated_at :datetime
#  plant_id   :integer
#  i          :decimal(, )
#  j          :decimal(, )
#  radius     :decimal(, )
#

class Planting < ActiveRecord::Base
  belongs_to :garden
  belongs_to :plant
  validates :garden, presence: true
end
