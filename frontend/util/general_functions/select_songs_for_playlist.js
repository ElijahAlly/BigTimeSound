export const selectSongsForPlaylist = (songsObj, playlistSongsIds, playlistId) => {
    let songsInPlaylist = [];
    let songIds = playlistSongsIds[playlistId];

    if (!songIds) return [];
    
    songIds.forEach((songId) => {
        songsInPlaylist.push(songsObj[songId])
    })

    return songsInPlaylist;
}

export const selectSongsForAlbumOrArtist = (songsObj, matchId, type) => {
    let selectedSongs = [];
    
    Object.values(songsObj).forEach(song => {
        if (parseInt(matchId) === song[type]) {
            selectedSongs.push(song)
        }
    })

    return selectedSongs;
}
