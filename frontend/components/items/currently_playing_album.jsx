import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions/album_actions';

class CurrentlyPlayingAlbum extends Component {
    constructor(props) {
        super(props);
    }

    
    componentDidUpdate() {
        if (!this.props.album) {this.props.fetchAlbums()}
    }

    render() { 
        let albumCover = 'http://tny.im/no-cover-art'
        if (this.props.album) albumCover = this.props.album.url 
        return (  
            <img src={albumCover} />
        );
    }
}
 
const mSTP = (state, ownProps) => {
    let album_id = 0;
    if (state.ui.currentlyPlaying.song) {
        album_id = state.ui.currentlyPlaying.song.album_id;
    }
	return ({
		album: state.entities.albums[album_id],
        isPlaying: state.ui.currentlyPlaying.isPlaying
	});
};

const mDTP = (dispatch) => ({
	fetchAlbums: () => dispatch(fetchAlbums()),
	// fetchAllSongs: () => dispatch(fetchAllSongs()),
	// playSong: (song) => dispatch(playSong(song)),
	// pauseSong: () => dispatch(pauseSong()),
});


export default connect(mSTP, mDTP)(CurrentlyPlayingAlbum);