import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { sendPopoutPosition } from '../../../actions/song/currently_playing';

class AlbumPopout extends Component {
	constructor(props) {
		super(props);
		this.sendPos = this.sendPos.bind(this);
	}

	sendPos(e) {
		const x = e.x;
		const y = e.y;
		const position = { x, y };
		this.props.sendPopoutPosition(position);
	}

	render() {
		let { album, popoutPosition } = this.props;
		let albumCover = 'http://tny.im/no-cover-art';
		if (album) albumCover = album.url;
		let pos = { x: 0, y: -300 };
		if (popoutPosition && popoutPosition.x !== null) pos = popoutPosition;
		if (pos.x > 800) pos.x = 500;
		if (pos.y > 800) pos.y = 500;
		return (
			<Draggable defaultPosition={{ x: 0, y: -300 }}>
				<section className='album-popout-container'>
					<img id='album-popout' src={albumCover} />
				</section>
			</Draggable>
		);
	}
}

const mSTP = ({ ui, entities }) => {
	let album_id = 0;
	let currentSong = ui.currentlyPlaying.song;
	if (currentSong) album_id = currentSong.album_id;

	return {
		popoutShowing: ui.currentlyPlaying.popoutShowing,
		popoutPosition: ui.currentlyPlaying.popoutPosition,
		album: entities.albums[album_id],
	};
};

const mDTP = (dispatch) => ({
	sendPopoutPosition: (popoutPosition) =>
		dispatch(sendPopoutPosition(popoutPosition)),
});

export default connect(mSTP, mDTP)(AlbumPopout);
