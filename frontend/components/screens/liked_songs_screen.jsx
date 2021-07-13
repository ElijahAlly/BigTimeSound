import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchLikedSongs } from '../../actions/song_actions';
import SongItem from '../items/song_item';
import SongListHeader from '../items/song_list_header';

class LikedSongsScreen extends Component {
	componentDidMount() {
		this.props.fetchLikedSongs(this.props.currentUser.id);
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className='liked-songs-screen'>
				<section className='liked-songs-header'>
					<div>
						<img
							className='liked-songs-image'
							src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'></img>
					</div>
					<div className='liked-songs-title'>
						<h3>PLAYLIST</h3>
						<h2>Liked Songs</h2>
						<h3 className='liked-songs-users-name'>
							{this.props.currentUser.username}
						</h3>
					</div>
				</section>
				<SongListHeader />
				<section>
					<ul className='song-list'>
						{this.props.likedSongs ? (
							this.props.likedSongs.map((song, i) => (
								<SongItem number={i + 1} key={song.id} song={song} />
							))
						) : (
							<li>No Songs</li>
						)}
					</ul>
				</section>
			</div>
		);
	}
}

const mSTP = ({ entities, session }, ownProps) => {
	return {
		currentUser: entities.user[session.currentUser],
		playlists: entities.playlists,
		likedSongs: Object.values(entities.likedSongs),
	};
};

const mDTP = (dispatch) => ({
	fetchLikedSongs: (userId) => dispatch(fetchLikedSongs(userId)),
});

export default withRouter(connect(mSTP, mDTP)(LikedSongsScreen));
