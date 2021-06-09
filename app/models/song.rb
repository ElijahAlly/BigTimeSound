# == Schema Information
#
# Table name: songs
#
#  id         :bigint           not null, primary key
#  artist_id  :integer          not null
#  album_id   :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Song < ApplicationRecord
    has_one_attached :mp3

    has_many :likes,
        foreign_key: :song_id,
        class_name: :Like

    belongs_to :artist,
        foreign_key: :artist_id,
        class_name: :Artist
    
    belongs_to :album,
        foreign_key: :album_id,
        class_name: :Album
    
    has_many :playlists,
        foreign_key: :song_id,
        class_name: :PlaylistInclusion
end
