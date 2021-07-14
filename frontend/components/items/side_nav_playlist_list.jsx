import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SideNavPlaylistList = ({playlists, handleClass, history, addBackPath }) => {
	return (
		<section className='side-playlists'>
			{playlists.length > 0 ? (
				playlists.map((playlist) => {
					return (
						<h3
							key={playlist.id}
							onClick={() => {
								history.push(
									`/users/${playlist.user_id}/playlist/${playlist.id}`
								);
								handleClass() ? addBackPath() : null;
							}}>
							{playlist.name}
						</h3>
					);
				})
			) : (
				<div>No Playlists</div>
			)}
		</section>
	);
};

export default withRouter(connect(null)(SideNavPlaylistList));
