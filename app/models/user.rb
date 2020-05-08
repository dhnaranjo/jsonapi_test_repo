class User < ApplicationRecord
  devise :database_authenticatable, :rememberable

  enum role: {admin: "admin", user: "user"}

  has_many :things
  has_and_belongs_to_many :flavors
  has_and_belongs_to_many :fears

  has_many :public_things, -> { non_private }, class_name: "Thing"
end
