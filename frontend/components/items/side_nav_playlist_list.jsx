import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {formatName} from '../../util/general_functions/format_name'

const SideNavPlaylistList = (props) => {
	const { userId, history, playlists, addBackPath, handleClass, playingFrom, isPlaying } = props;

	const listPlaylists = (playlists) => {
		let renderPlaylists = [];

		playlists.map((playlist, i) => {
			if (playlist.user_id === userId) {
				let playlistEle = (
					<h3
						key={i}
						onClick={() => {
							history.push(
								`/users/${userId}/playlist/${playlist.id}`
							);
							handleClass() ? addBackPath() : null;
						}}>
						<div>
							{formatName(playlist.name, 14)}
						</div>
						{isPlaying && playingFrom === playlist.name ? (
							<svg
							role='presentation'
							height='16'
							width='16'
							aria-label='Volume high'
							id='volume-icon'
							viewBox='0 0 16 16'
							fill='currentColor'>
							<path d='M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z'></path>
						</svg>
						) : <></>}
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

const mSTP = ({ui}) => ({
	playingFrom: ui.currentlyPlaying.playingFrom,
	isPlaying: ui.currentlyPlaying.isPlaying,
})

export default withRouter(connect(mSTP)(SideNavPlaylistList));
