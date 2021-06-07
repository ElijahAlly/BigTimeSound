class RemovePlaylistIncIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :playlist_inclusions, :playlist_id
    remove_index :playlist_inclusions, :song_id
  end
end
