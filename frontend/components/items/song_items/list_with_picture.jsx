import React from 'react';
import { formatName } from '../../../util/general_functions/format_name';
import MoreSongActions from './more_song_actions';

const ListWithPicture = (props) => {
	let {
		albums,
		artists,
		list,
		shouldSlice,
		songs,
		likedSongs,
		inPlaylist,
		playlistId,
		addSongToPlaylist,
		inLikedSongs,
		fetchAllPlaylistIds,
		userId,
		history,
		toggleLike,
		songsInThisPlaylist,
	} = props;

	const addSong = (songId) => {
		addSongToPlaylist(userId, songId, playlistId).then(() => {
			fetchAllPlaylistIds(userId).then(() => {
				history.push(`/users/${userId}`);
				history.push(`/users/${userId}/playlist/${playlistId}`);
			});
		});
	};

	if (!list) list = albums;
	if (!list) list = artists;
	if (shouldSlice && list.length > 5) list = list.slice(0, 5);
	let likedSongsIds = [];
	likedSongs ? likedSongs.map((song) => likedSongsIds.push(song.id)) : null;

	// could shorten but would be more confusing
	if (inLikedSongs) {
		// if searching on liked songs page will remove songs already liked
		let removeAlreadyLikedSongs = [];
		for (let i = 0; i < songs.length; i++) {
			let songInLiked = false;

			for (let j = 0; j < likedSongs.length; j++) {
				if (likedSongs[j].id === songs[i].id) {
					songInLiked = true;
				}
			}

			if (!songInLiked) removeAlreadyLikedSongs.push(songs[i]);
		}

		songs = removeAlreadyLikedSongs;
	} else if (inPlaylist) {
		// if searching on a playlist page, will remove songs already added to playlist
		let removedAlreadyAddedSongs = [];

		for (let i = 0; i < songs.length; i++) {
			let songInPlaylist = false;

			for (let j = 0; j < songsInThisPlaylist.length; j++) {
				if (songsInThisPlaylist[j].id === songs[i].id) {
					songInPlaylist = true;
				}
			}

			if (!songInPlaylist) removedAlreadyAddedSongs.push(songs[i]);
		}

		songs = removedAlreadyAddedSongs;
	}

	return (
		<section className='list-with-picture'>
			{songs ? (
				<ul className='searched-songs-list'>
					{songs.map((song, i) => (
						<li
							key={i}
							className={`searched-song ${inPlaylist ? 'playlist-song' : ''}`}>
							<img
								src={song.imgUrl}
								className={`song-img ${inPlaylist ? 'playlist-img' : ''}`}
							/>
							<div className={`song-info ${inPlaylist ? 'playlist-info' : ''}`}>
								<h1 className='title'>{song.title}</h1>
								<h2 className='artist'>{song.artistName}</h2>
							</div>
							<div
								className='like-btn-container'
								id='like-btn-container-margin-top'>
								{likedSongsIds.includes(song.id) ? (
									<svg
										role='img'
										height='16'
										width='16'
										viewBox='0 0 16 16'
										className='like-song-btn'
										fill='currentColor'
										id='liked'
										onClick={() => toggleLike(song)}>
										<path fill='none' d='M0 0h16v16H0z'></path>
										<path d='M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z'></path>
									</svg>
								) : (
									<svg
										role='img'
										height='16'
										width='16'
										viewBox='0 0 16 16'
										className='like-song-btn'
										fill='none'
										onClick={() => toggleLike(song)}>
										<path fill='none' d='M0 0h16v16H0z'></path>
										<path
											id='not-liked'
											d='M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z'></path>
									</svg>
								)}
								{inPlaylist ? (
									<div className='add-song' onClick={() => addSong(song.id)}>
										<h2>ADD</h2>
									</div>
								) : (
									<></>
								)}
								{!inPlaylist && !inLikedSongs ? <MoreSongActions isLikedSong={likedSongsIds.includes(song.id)} toggleLike={() => toggleLike(song)} key={Math.random()} song={song} fromWhere={'search'}/> : <></>}
								{/* if on search page add three menu dots to add to playlist or add to queue or go to artist/album page */}
							</div>
						</li>
					))}
				</ul>
			) : (
				<ul className='list-ul'>
					{list.map((el, i) => (
						<li key={i} className='li-background'>
							<img
								src={el.url}
								className={`list-img ${!el.artist_id ? 'artist-img' : ''}`}
							/>
							<h3 className='list-name'>
								{el.name ? formatName(el.name, 18) : 'no name key in obj'}
							</h3>
							{el.artist_id ? (
								<h2 className='list-artist'>{formatName(el.artist, 18)}</h2>
							) : (
								<></>
							)}
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

export default ListWithPicture;
