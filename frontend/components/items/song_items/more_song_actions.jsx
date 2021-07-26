import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addSongToPlaylist } from '../../../actions/playlist_actions';
import { addedToPlaylist, playingNext, removedFromPlaylist, displayMessage } from '../../../util/general_functions/action_messages';
import { formatName } from '../../../util/general_functions/format_name';

class MoreSongActions extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.song.id !== nextProps.song.id) return true;
		return false;
	}

	componentWillUnmount() {
		const {song} = this.props;
		const songActionsBtn = document.getElementById(
			`actions-btn-${song.id}`
		);
		const songActions = document.getElementsByClassName(
			`actions-${song.id}`
		)[0];

		document.body.removeEventListener('click', (e) => {
			if (
				(songActions.style.display === 'none' ||
					songActions.style.display === '') &&
				e.path[0] === songActionsBtn
			) {
				let newX = e.clientX * 0.84;
				let newY = e.clientY * 0.9;

				songActions.style.display = 'flex';
				songActions.style.left = `${newX}px`;
				songActions.style.top = `${newY}px`;
				return;
			} else if (
				songActions.style.display === 'flex' &&
				(e.path[0] !== songActionsBtn || e.path[1] !== songActions)
			) {
				songActions.style.display = 'none';
				return;
			}
		});
	}

	componentDidMount() {
		const {song} = this.props;
		const songActionsBtn = document.getElementById(
			`actions-btn-${song.id}`
		);
		const songActions = document.getElementsByClassName(
			`actions-${song.id}`
		)[0];

		document.body.addEventListener('click', (e) => {
			if (
				(songActions.style.display === 'none' ||
					songActions.style.display === '') &&
				e.path[0] === songActionsBtn
			) {
				let newX = e.clientX * 0.84;
				let newY = e.clientY * 0.9;

				songActions.style.display = 'flex';
				songActions.style.left = `${newX}px`;
				songActions.style.top = `${newY}px`;
				return;
			} else if (
				songActions.style.display === 'flex' &&
				(e.path[0] !== songActionsBtn || e.path[1] !== songActions)
			) {
				songActions.style.display = 'none';
				return;
			}
		});

		const playlistBtn = document.getElementById(`playlist-btn-${song.id}`)
		const playlistList = document.getElementById(`playlist-list-${song.id}`)

		playlistBtn.onmouseenter = () => {
			playlistList.style.display = 'flex';
		};

		playlistList.onmouseleave = () => {
			playlistList.style.display = 'none';
		};
	}

	render() {
		const {
			song,
			history,
			userId,
			playlists,
			fromWhere,
			toggleLike,
			isLikedSong,
			queueScreen,
			addSongToPlaylist,
			removeFromPlaylist,
			addSongToFrontQueue,
		} = this.props;
		// fromWhere options -> ['liked-songs', 'search', '<any playlist name (any string)>']

		// check to see if song is in likes (liked) to conditionally display 'remove from your liked songs'/'add to your liked songs'
		let likedSongMessage = 'Add to your Liked Songs';
		if (fromWhere === 'liked-songs' || isLikedSong) {
			likedSongMessage = 'Remove from your Liked Songs';
		}

		// check to see if in a playlist to conditionally display 'remove from this playlist'
		let removeFromPlaylistBtn = (
			<>
				<button
					className='playlist'
					onClick={() => {
						displayMessage(removedFromPlaylist)
						removeFromPlaylist()}}
					key={song.id}>
					Remove from this playlist
				</button>
				<div className='song-actions-line-break'></div>
			</>
		);

		if (fromWhere === 'liked-songs' || queueScreen || fromWhere === 'search') {
			removeFromPlaylistBtn = <></>;
		}

		// always display 'add to playlist'-> displays another section containing list of playlists
		// always display 'play next'
		// always display, 'go to artist/album'
		return (
			<section className='more-song-actions-container' key={song.id}>
				<i
					className='fas fa-ellipsis-h more-song-actions-btn'
					id={`actions-btn-${song.id}`}></i>
				<section className={`song-actions actions-${song.id}`}>
					<button
						className='play-next-btn'
						onClick={() => {
							displayMessage(playingNext)
							addSongToFrontQueue()}}>
						Play next
					</button>
					<div className='song-actions-line-break'></div>
					<button
						className='artist-btn'
						onClick={() =>
							history.push(`/users/${userId}/artist/${song.artist_id}`)
						}>
						Go to artist
					</button>
					<button
						className='album-btn'
						onClick={() =>
							history.push(`/users/${userId}/album/${song.album_id}`)
						}>
						Go to album
					</button>
					<div className='song-actions-line-break'></div>
					<button className='liked-songs-btn' onClick={() => toggleLike()}>
						{likedSongMessage}
					</button>
					<div className='song-actions-line-break'></div>
					{removeFromPlaylistBtn}
					<button className='playlist-btn' id={`playlist-btn-${song.id}`}>
						<i className='fas fa-caret-left'></i>
						<div>Add to playlist</div>
					</button>
					<section className='playlists-list-container' id={`playlist-list-${song.id}`}>
						<ul className='playlists-list'>
							{playlists.map(playlist => (
								<li className='playlist-name' onClick={() => { 
									displayMessage(addedToPlaylist)
									addSongToPlaylist(userId, song.id, playlist.id)}} key={Math.random()}>{formatName(playlist.name, 14)}</li>
							))}
						</ul>
					</section>
				</section>
			</section>
		);
	}
}

const mSTP = ({entities, session}) => ({
	playlists: Object.values(entities.playlists),
	userId: session.currentUser
})

const mDTP = (dispatch) => ({
	addSongToPlaylist: (userId, songId, playlistId) => dispatch(addSongToPlaylist(userId, songId, playlistId))
})

export default withRouter(connect(mSTP, mDTP)(MoreSongActions));
