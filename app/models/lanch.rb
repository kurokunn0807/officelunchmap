class Lanch < ActiveRecord::Base
  validates :adress, presence: true
  validates :name, presence: true
end
