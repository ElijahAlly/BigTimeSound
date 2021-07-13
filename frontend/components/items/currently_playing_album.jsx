import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums, collapseAlbumCover } from '../../actions/album_actions';

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
						<svg
							fill='currentColor'
							height='24'
							role='img'
							width='24'
							viewBox='0 0 24 24'
							className='collapse-album-cover'
							onClick={() => this.props.collapseAlbumCover()}>
							<polygon points='7.96,21.151 7.311,20.39 16.865,12.229 7.311,4.069 7.96,3.309 18.405,12.229 '></polygon>
						</svg>
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
