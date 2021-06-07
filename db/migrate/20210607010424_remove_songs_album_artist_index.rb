class RemoveSongsAlbumArtistIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :songs, :artist_id
    remove_index :songs, :album_id
  end
end
