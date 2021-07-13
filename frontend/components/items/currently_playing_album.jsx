import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums, collapseAlbumCover } from '../../actions/album_actions';
import ArrowButton from './arrow_button';

class CurrentlyPlayingAlbum extends Component {
	componentDidUpdate() {
		if (!this.props.album) {
			this.props.fetchAlbums();
		}
	}

	render() {
		let albumCover = 'http://tny.im/no-cover-art';
		if (this.props.album) albumCover = this.props.album.url;
		return (
			<section className='side-nav-album-cover'>
				{this.props.albumIsCollapsed ? (
					<></>
				) : (
					<>
						<ArrowButton classname={'collapse-album-cover'} action={this.props.collapseAlbumCover}/>
						<img src={albumCover} />
						</>
						)}
			</section>
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
    collapseAlbumCover: () => dispatch(collapseAlbumCover())
});

export default connect(mSTP, mDTP)(CurrentlyPlayingAlbum);
