
json.album do 
    json.id @album.id
    json.name @album.name
    json.artist_id @album.id
    json.url url_for(@album.cover)
    json.songs @album.songs do |song|
        json.id song.id
    end
end