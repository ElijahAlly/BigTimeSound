@songs.each do |song|
    json.set! song.id do
      json.id  song.id
      json.title song.title
      json.artist_id song.artist_id
      json.album_id song.album_id
      json.url url_for(song.mp3) 
    end
end