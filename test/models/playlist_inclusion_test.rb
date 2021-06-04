# == Schema Information
#
# Table name: playlist_inclusions
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  song_id     :integer          not null
#  playlist_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'test_helper'

class PlaylistInclusionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
