json.set! :album do
    json.set! :id, @album.id 
    json.set! :cover, url_for(@album.cover)
    json.set! :songs, @album.songs 
    json.set! :artist_id, @album.artist_id 
    json.set! :name, @album.name 
end
