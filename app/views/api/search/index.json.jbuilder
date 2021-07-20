json.set! :data do 
    json.set! :playlists, @playlists.to_a 
    json.set! :artists, @artists.to_a
    json.set! :albums, @albums.each do |album|
      json.id album.id
      json.name album.name
      json.artist_id album.artist_id
      json.url url_for(album.cover)
    end
    json.set! :songs, @songs.each do |song|
      json.id  song.id
      json.title song.title
      json.artist_id song.artist_id
      json.album_id song.album_id
      json.url url_for(song.mp3) 
    end
end
