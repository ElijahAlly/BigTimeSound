export const selectSongsForPlaylist = (songsObj, playlistSongsIds, playlistId) => {
    let songsInPlaylist = [];
    let songIds = playlistSongsIds[playlistId];

    if (!songIds) return [];
    
    songIds.forEach((songId) => {
        songsInPlaylist.push(songsObj[songId])
    })

    return songsInPlaylist;
}