import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addBackPath } from '../../actions/path_actions';
import { fetchAlbums } from '../../actions/album_actions';
import { fetchArtists } from '../../actions/artist_actions';
import { fetchAllPlaylistIds } from '../../actions/playlist_actions';
import {
	fetchAllSongs,
	fetchLikedSongs,
} from '../../actions/song/song_actions';
import { handleColorShift } from '../../util/general_functions/header_color_switch';
import UserSuggestedLinks from '../items/user_suggested_links';
import ListWithPicture from '../items/song_items/list_with_picture';
import {
	assignArtistsToAlbums,
	assignImages,
} from '../../util/general_functions/assign_functions';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		const greet = this.greeting();
		this.state = { greet };
	}

	componentDidMount() {
		const {
			currentUser,
			fetchLikedSongs,
			fetchAllPlaylistIds,
			fetchAllSongs,
			fetchArtists,
			fetchAlbums,
		} = this.props;

		window.scrollTo(0, 0);
		handleColorShift('#402758');
		const main = document.getElementById('main');
		main.style.background = '#3f2657';
		
		fetchAlbums();
		fetchArtists();
		fetchAllSongs();
		fetchLikedSongs(currentUser.id);
		fetchAllPlaylistIds(currentUser.id);
	}

	greeting() {
		const date = new Date();
		const hrs = date.getHours();
		let greet;

		if (hrs >= 5 && hrs <= 11) {
			greet = 'morning';
		} else if (hrs >= 12 && hrs <= 17) {
			greet = 'afternoon';
		} else {
			greet = 'evening';
		}

		return greet;
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.albums !== nextProps.albums) return true;
		return false;
	}

	render() {
		const { currentUser, addBackPath, albums, artists, history } = this.props;
		return (
			<div className='screen home-screen'>
				<h1 className='section-header'>
					Good {this.state.greet}, {currentUser.username}
				</h1>
				{artists.length && artists.length > 0 ? (
					<UserSuggestedLinks
					currentUser={currentUser}
					addBackPath={addBackPath}
					/>
				) : <></>}
				<h1 className='section-header'>Popular Albums</h1>
				<ListWithPicture
					history={history}
					albums={albums}
					userId={currentUser.id}
					addBackPath={addBackPath}
				/>
				<h1 className='section-header'>Popular Artists</h1>
				<ListWithPicture
					history={history}
					artists={artists.reverse()}
					userId={currentUser.id}
					addBackPath={addBackPath}
				/>
			</div>
		);
	}
}

const mSTP = ({ entities, session, ui }) => ({
	currentUser: entities.user[session.currentUser],
	artists: assignImages(entities.artists, entities.albums),
	albums: assignArtistsToAlbums(entities.artists, entities.albums),
	playlists: Object.values(entities.playlists),
});

const mDTP = (dispatch) => ({
	addBackPath: () => dispatch(addBackPath()),
	fetchAlbums: () => dispatch(fetchAlbums()),
	fetchArtists: () => dispatch(fetchArtists()),
	fetchAllSongs: () => dispatch(fetchAllSongs()),
	fetchLikedSongs: (userId) => dispatch(fetchLikedSongs(userId)),
	fetchAllPlaylistIds: (userId) => dispatch(fetchAllPlaylistIds(userId)),
});

export default withRouter(connect(mSTP, mDTP)(HomeScreen));
