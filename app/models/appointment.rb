# == Schema Information
#
# Table name: appointments
#
#  id         :integer          not null, primary key
#  name       :string
#  time       :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Appointment < ApplicationRecord
    validates :name, :time, presence: true
    validates :name, length: { minimum: 3 }

    validate :time_cannot_be_in_past

    belongs_to :user

    private

        def time_cannot_be_in_past
           errors.add(:time, "can't be in the past") if time.present? && time < Time.now
        end
end
