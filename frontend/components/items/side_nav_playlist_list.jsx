import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SideNavPlaylistList = (props) => {
	const { userId, history, playlists, addBackPath, handleClass } = props;

	const listPlaylists = (playlists) => {
		let renderPlaylists = [];

		playlists.map((playlist, i) => {
			if (playlist.user_id === userId) {
				let playlistEle = (
					<h3
						key={i}
						onClick={() => {
							history.push(
								`/users/${playlist.user_id}/playlist/${playlist.id}`
							);
							handleClass() ? addBackPath() : null;
						}}>
						{playlist.name}
					</h3>
				);

				renderPlaylists.push(playlistEle);
			}
		});

		return renderPlaylists;
	};

	return (
		<section className='side-playlists'>
			{playlists.length > 0 ? (
				<>{listPlaylists(playlists).map((playlist) => playlist)}</>
			) : (
				<div>No Playlists</div>
			)}
		</section>
	);
};

export default withRouter(connect(null)(SideNavPlaylistList));
