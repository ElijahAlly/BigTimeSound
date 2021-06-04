class CreatePlaylistInclusions < ActiveRecord::Migration[5.2]
  def change
    create_table :playlist_inclusions do |t|
      t.string :name, null: false
      t.integer :song_id, null: false
      t.integer :playlist_id, null: false

      t.timestamps
    end

    add_index :playlist_inclusions, :song_id, unique: true
    add_index :playlist_inclusions, :playlist_id, unique: true
  end
end
