# == Schema Information
#
# Table name: gardens
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  height     :integer
#  width      :integer
#  created_at :datetime
#  updated_at :datetime
#

class Garden < ActiveRecord::Base
  has_many :plantings
end
