json.extract! @playlist, :id, :name, :user_id, { 'songs': @playlist.songs }
