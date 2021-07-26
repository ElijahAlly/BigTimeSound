import React, { Component } from 'react';
import { formatName } from '../../../util/general_functions/format_name';
import {addBackPath} from '../../../actions/path_actions'
import { connect } from 'react-redux';

const TopSearchResult = ({ item, history, addBackPath, userId }) => {
    let {url, imgUrl, name, title, artist, user_id, artistName } = item;
    let type = 'ARTIST';
    let whereTo = 'artist'
    let pathId = item.id;
    if (imgUrl) {
        type = 'SONG';
        whereTo = 'album'
        pathId = item.album_id;
    }
    if (artist) {
        type = 'ALBUM';
        whereTo = 'album'
    }

    if (user_id) {
        type = 'PLAYLIST';
        whereTo = 'playlist'
    }

    if (!imgUrl && !url) imgUrl = 'https://active-storage-big-time-sound-seeds.s3.amazonaws.com/d3kxnbe-f16dabfb-0cf1-436c-9315-915fbe462f23.png'
	return (
		<section className='top-result-background' onClick={() => {
            addBackPath()
            history.push(`/users/${userId}/${whereTo}/${pathId}`)}}>
			<img
				src={imgUrl ? imgUrl : url}
                className={`${type === 'ARTIST' ? 'artist': ''}`}
				id='best-result-img'
			/>
            <h1 id='best-result-name'>{name ? formatName(name, 25) : formatName(title, 25)}</h1>
            <div id='result-type'>
                {type !== 'ARTIST' ? <h3>{artist ? artist : artistName}</h3> : <></>}
                <h2>{type}</h2>
            </div>
		</section>
	);
};

const mSTP = ({session}) => ({
    userId: session.currentUser,
})

const mDTP = (dispatch) => ({
    addBackPath: () => dispatch(addBackPath()),
})

export default connect(mSTP, mDTP)(TopSearchResult);
