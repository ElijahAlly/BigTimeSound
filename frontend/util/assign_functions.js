export const assignImages = (artists, albums) => {
	if (!albums || !artists) return [];
	artists = artists.length ? artists : Object.values(artists);
	albums = albums.length ? albums : Object.values(albums);

	artists.forEach((artist) => {
		albums.forEach((album) => {
			if (album.artist_id === artist.id) {
				artist.url = album.url;
			}
		});
	});

	return artists;
};

export const assignArtistsToAlbums = (artists, albums) => {
	if (!albums || !artists) return [];
	artists = artists.length ? artists : Object.values(artists);
	albums = albums.length ? albums : Object.values(albums);

	albums.forEach((album) => {
		artists.forEach((artist) => {
			if (album.artist_id === artist.id) {
				album.artist = artist.name;
			}
		});
	});

	
	return albums;
};

export const assignImagesToSongs = (songs, albums) => {
	if (!albums || !songs) return [];
	songs = songs.length ? songs : Object.values(songs);
	albums = albums.length ? albums : Object.values(albums);

	songs.forEach((song) => {
		albums.forEach((album) => {
			if (song.album_id === album.id) {
				song.imgUrl = album.url;
			}
		});
	});

	return assignArtistsToSongs(songs, albums);
}

const assignArtistsToSongs = (songs, albums) => {

	songs.forEach((song) => {
		albums.forEach((album) => {
			if (song.album_id === album.id) {
				song.artistName = album.artist;
			}
		});
	});

	return songs;
}