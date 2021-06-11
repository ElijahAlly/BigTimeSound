
@albums.each do |album|
    json.set! album.id do
        json.id album.id
        json.name album.name
        json.artist_id album.artist_id
        json.url url_for(album.cover)
    end
end
  