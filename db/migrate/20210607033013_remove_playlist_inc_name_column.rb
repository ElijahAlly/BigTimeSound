class RemovePlaylistIncNameColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :playlist_inclusions, :name
  end
end
