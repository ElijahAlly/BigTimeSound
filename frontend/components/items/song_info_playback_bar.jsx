import React, { Component } from 'react';
import { connect } from 'react-redux';

class SongInfoPlaybackBar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // if (!this.props.album) {this.props.fetchAlbums()}
    }

    render() { 
        let artistName = 'no artist name'
        if (this.props.artist) artistName = this.props.artist.name 

        let songTitle = 'no song playing'
        if (this.props.isPlaying || this.props.song) songTitle = this.props.song.title
        return (  
            <>
                <h3>{songTitle}</h3>
                <h5>{artistName}</h5>
            </>
        );
    }
}

const mSTP = (state, ownProps) => {
    let artist_id = 0;
    if (state.ui.currentlyPlaying.song) {
        artist_id = state.ui.currentlyPlaying.song.artist_id;
    }
	return ({
        isPlaying: state.ui.currentlyPlaying.isPlaying,
        song: state.ui.currentlyPlaying.song,
        artist: state.entities.artists[artist_id],
	});
};

// const mDTP = (dispatch) => ({
// 	// fetchAlbums: () => dispatch(fetchAlbums()),
// 	// fetchAllSongs: () => dispatch(fetchAllSongs()),
// 	// playSong: (song) => dispatch(playSong(song)),
// 	// pauseSong: () => dispatch(pauseSong()),
// });


export default connect(mSTP, null)(SongInfoPlaybackBar);