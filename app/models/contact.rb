class Contact < ApplicationRecord
	validates :content, {presence: true,length: {maximum: 1000}}
	validates :name, {presence: true}
	validates :email, {presence: true}
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }
end
