class User < ApplicationRecord
  devise :database_authenticatable, :rememberable

  enum role: {admin: "admin", user: "user"}

  has_many :things
  has_many :user_flavors
  has_many :flavors, through: :user_flavors

  has_many :public_things, -> { non_private }, class_name: "Thing"
end
