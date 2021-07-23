json.data do
  json.songs do
    @songs.each do |song|
      json.set! song.id do
        json.id  song.id
        json.title song.title
        json.artist_id song.artist_id
        json.album_id song.album_id
        json.url url_for(song.mp3) 
      end
    end
  end
  json.likes do
    @likes.each do |like| 
      json.set! like.song_id do
        json.id like.id
        json.song_id like.song_id
        json.user_id like.user_id
      end
    end
  end
end

