import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { playlistPics } from '../../util/general_functions/playlist_pictures';

const UserSuggestedLinks = ({
	currentUser,
	addBackPath,
	playlists,
	albums,
	artists,
}) => {
	let suggested = [];

	for (let i = 0; i < 3; i++) {
		suggested.push(albums[i]);
	}

	for (let i = 0; i < 4; i++) {
		if (playlists[i]) {
			suggested.push(playlists[i]);
		} else {
			suggested.push(artists[i]);
		}
	}

	if (!suggested[0]) return null;
	suggested.forEach((item) => {
		if (item.artist_id) {
			item.link = `/users/${currentUser.id}/album/${item.id}`;
			return;
		} else if (item.user_id) {
			item.link = `/users/${currentUser.id}/playlist/${item.id}`;
			return;
		}

		item.link = `/users/${currentUser.id}/artist/${item.id}`;
	});

	return (
		<section className='suggested'>
			<div className='outer-div'>
				<Link
					to={`/users/${currentUser.id}/liked-songs`}
					onClick={() => addBackPath()}>
					<img
						height='100'
						width='100'
						src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
					/>
					<h2>Liked Songs</h2>
				</Link>
				{suggested.slice(0, 3).map((ele, i) => (
					<Link key={i} to={ele.link} onClick={() => addBackPath()}>
						<img
							height='100'
							width='100'
							src={
								ele.url
									? ele.url
									: `https://active-storage-big-time-sound-seeds.s3.amazonaws.com/d3kxnbe-f16dabfb-0cf1-436c-9315-915fbe462f23.png`
							}
						/>
						<h2>{ele.name}</h2>
					</Link>
				))}
			</div>
			<div className='outer-div'>
				{suggested.slice(3).map((ele, i) => (
					<Link key={i} to={ele.link} onClick={() => addBackPath()}>
						<img
							height='100'
							width='100'
							src={ele.url ? ele.url : playlistPics[i]}
						/>
						<h2>{ele.name}</h2>
					</Link>
				))}
			</div>
		</section>
	);
};

const mSTP = ({ entities }) => ({
	playlists: Object.values(entities.playlists),
	albums: Object.values(entities.albums).reverse(),
	artists: Object.values(entities.artists),
});

export default connect(mSTP)(UserSuggestedLinks);
