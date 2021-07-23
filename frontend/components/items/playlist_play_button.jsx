import React, { Component } from 'react';
import { connect } from 'react-redux';

const PlaylistPlayButton = (props) => {
    let {fromWhere, playingFrom, togglePlay, isPlaying} = props;

    let togglePlayButton = (
        <svg height='16' width='16' fill='currentColor' viewBox='0 0 16 16'>
            <path d='M4.018 14L14.41 8 4.018 2z'></path>
        </svg>
    );

    if (isPlaying && playingFrom === fromWhere) {
        togglePlayButton = (
            <svg height='16' width='16' viewBox='0 0 16 16' fill='currentColor'>
                <path d='M3 2h3v12H3zm7 0h3v12h-3z'></path>
            </svg>
        );
    }

    return (
        <>
            <section className='big-green-play-btn-container'>
                <h3
                    className='big-green-play-btn'
                    onClick={() => togglePlay()}>
                    {togglePlayButton}
                </h3>
            </section>
        </>
    );
}

const mSTP = ({ui}, ownProps) => ({
    playingFrom: ui.currentlyPlaying.playingFrom,
    isPlaying: ui.currentlyPlaying.isPlaying,
})

 
export default connect(mSTP)(PlaylistPlayButton);