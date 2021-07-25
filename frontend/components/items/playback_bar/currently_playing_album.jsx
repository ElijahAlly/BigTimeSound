import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums, collapseAlbumCover } from '../../../actions/album_actions';
import ArrowButton from '../arrow_button';

class CurrentlyPlayingAlbum extends Component {
	// componentDidUpdate() {
	// 	if (!this.props.album) {
	// 		this.props.fetchAlbums();
	// 	}
	// }
 
	render() {
		const { album, albumIsCollapsed, collapseAlbumCover } = this.props;
		let albumCover = 'https://active-storage-big-time-sound-seeds.s3.amazonaws.com/d3kxnbe-f16dabfb-0cf1-436c-9315-915fbe462f23.png';
		if (album) albumCover = album.url;

		return (
			<>
				{albumIsCollapsed ? (
					<></>
				) : (
					<section className='side-nav-album-cover'>
						<ArrowButton
							classname={'collapse-album-cover'}
							action={collapseAlbumCover}
						/>
						<img src={albumCover} />
					</section>
				)}
			</>
		);
	}
}

const mSTP = (state, ownProps) => {
	let album_id = 0;
	if (state.ui.currentlyPlaying.song) {
		album_id = state.ui.currentlyPlaying.song.album_id;
	}
	return {
		album: state.entities.albums[album_id],
		isPlaying: state.ui.currentlyPlaying.isPlaying,
		albumIsCollapsed: state.ui.currentlyPlaying.albumIsCollapsed,
	};
};

const mDTP = (dispatch) => ({
	fetchAlbums: () => dispatch(fetchAlbums()),
	collapseAlbumCover: () => dispatch(collapseAlbumCover()),
});

export default connect(mSTP, mDTP)(CurrentlyPlayingAlbum);
