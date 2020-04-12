class Thing < ApplicationRecord
  belongs_to :user

  enum kinda: {meat: "meat", other: "other"}

  scope :non_private, -> { where(private: false) }
end
