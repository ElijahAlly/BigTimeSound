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
class PlaylistInclusion < ApplicationRecord
    belongs_to :song,
        foreign_key: :song_id,
        class_name: :Song
    
    belongs_to :playlist_id,
        foreign_key: :playlist_id,
        class_name: :Playlist
end
