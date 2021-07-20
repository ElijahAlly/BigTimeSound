import React, { Component } from 'react';

const ListWithPicture = (props) => {
	let { albums, artists, list, shouldSlice, songs } = props;

	const formatName = (str) => {
		if (str.length > 18) {
			str = str.slice(0, 16) + '...';
		}

		return str;
	};

	if (!list) list = albums;
	if (!list) list = artists;
	if (shouldSlice && list.length > 5) list = list.slice(0, 5);

	return (
		<section className='list-with-picture'>
			{songs ? (
				<ul className='searched-songs-list'>
					{songs.map((song, i) => {
						<li key={i} className='searched-song'>
							<img src={song.imgUrl} className='song-img'/>
							<div className='song-info'>
								<h1 className='title'>{song.title}</h1>
								<h2 className='artist'>{song.artistName}</h2>
							</div>

						</li>
					})}
				</ul>
			) : (
				<ul className='list-ul'>
				{list.map((el, i) => (
					<li key={i} className='li-background'>
						<img
							src={el.url}
							className={`list-img ${!el.artist_id ? 'artist-img' : ''}`}
							/>
						<h3 className='list-name'>
							{el.name ? formatName(el.name) : 'no name key in obj'}
						</h3>
						{el.artist_id ? (
							<h2 className='list-artist'>{formatName(el.artist)}</h2>
							) : (
								<></>
						)}
					</li>
				))}
			</ul>
				)}
		</section>
	);
};

export default ListWithPicture;
