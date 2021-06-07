class RemoveIndexPlaylist < ActiveRecord::Migration[5.2]
  def change
    remove_index :playlists, :user_id
  end
end
