class Tweet < ApplicationRecord
  belongs_to :user
  has_one_attached :image

  validates :message, length: { maximum: 140 }
  validates :user_id, presence: true

end
