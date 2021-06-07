# == Schema Information
#
# Table name: playlists
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Playlist < ApplicationRecord
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    has_many :songs,
        foreign_key: :playlist_id,
        class_name: :PlaylistInclusion

    # def addSong(song)
    #     self.
    # end
end
