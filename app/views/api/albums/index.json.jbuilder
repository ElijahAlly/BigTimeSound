
json.albums @albums do |album|
    json.id album.id
    json.name album.name
    json.artist_id album.artist_id
    json.url url_for(album.cover)
end
