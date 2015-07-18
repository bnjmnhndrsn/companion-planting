# == Schema Information
#
# Table name: plants
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Plant < ActiveRecord::Base
end
