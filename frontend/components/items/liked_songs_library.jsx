import React, { Component } from 'react';
import { connect } from 'react-redux';

const LikedSongsLibrary = ({ likedSongs, artists, history, userId }) => {
	let songs = []

    likedSongs.forEach((song) => {
		let newObj = {
			name: song.title,
			artistName: artists[`${song.artist_id}`].name,
		};
        songs.push(newObj)
	});

	return (
		<section className='liked-songs-block' onClick={() => history.push(`/users/${userId}/liked-songs`)}>
            <div className='song-list'>
                {songs.length > 0 ? 
                    <>
                        {songs.map((song, i) => (
                            <div key={i} className='song-info'>
                                <div id='name'>{song.name}</div>
                                <div id='artist-name'>{song.artistName}</div>
                                <i className="fas fa-circle"></i>
                            </div>
                        ))}
                    </>
                : <></>}
            </div>
            <div className='section-footer'>Liked Songs</div>
            <div className='liked-songs-count'>
                {likedSongs.length} liked songs
            </div>
		</section>
	);
};

const mSTP = ({ entities }) => ({
	likedSongs: Object.values(entities.likedSongs.songs),
	artists: entities.artists,
});

export default connect(mSTP)(LikedSongsLibrary);
