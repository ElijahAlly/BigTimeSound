class ChangeAlbumsArtistIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :albums, :artist_id
  end
end
