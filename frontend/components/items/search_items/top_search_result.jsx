import React, { Component } from 'react';
import { formatName } from '../../../util/general_functions/format_name';

const TopSearchResult = ({ item }) => {
    let {url, imgUrl, name, title, artist, user_id, artistName} = item;
    let type = 'ARTIST';
    if (imgUrl) type = 'SONG';
    if (artist) type = 'ALBUM';
    if (user_id) type = 'PLAYLIST';

    if (!imgUrl && !url) imgUrl = 'https://active-storage-big-time-sound-seeds.s3.amazonaws.com/d3kxnbe-f16dabfb-0cf1-436c-9315-915fbe462f23.png'
	return (
		<section className='top-result-background'>
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

export default TopSearchResult;
