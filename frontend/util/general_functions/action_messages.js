export const addedToPlaylist = 'Added to Playlist';
export const removedFromPlaylist = 'Removed from Playlist';

export const addToLikedSongs = 'Added to your Liked Songs';
export const removedFromLikedSongs = 'Removed from your Liked Songs';

export const playingNext = 'Playing Next';

export const deletedPlaylist = 'Deleted Playlist';

export const displayMessage = (message) => {
    let container = document.getElementsByClassName('message')[0];
    let messageDiv = document.getElementsByClassName('add-song-confirmation')[0];
    
    messageDiv.innerHTML = message
    container.style.display = 'flex'
    setTimeout(() => container.style.display = 'none', 3000)
}