import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const UserSuggestedLinks = ({currentUser, addBackPath}) => {
	return (
		<section className='suggested'>
			<div className='outer-div'>
				<Link
					to={`/users/${currentUser.id}/liked-songs`}
					onClick={() => addBackPath()}>
					<img
						height='100'
						width='100'
						src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
					/>
					<h2>Liked Songs</h2>
				</Link>
				<Link
					to={`/users/${currentUser.id}/liked-songs`}
					onClick={() => addBackPath()}>
					<img
						height='100'
						width='100'
						src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
					/>
					<h2>Chill</h2>
				</Link>
				<Link
					to={`/users/${currentUser.id}/liked-songs`}
					onClick={() => addBackPath()}>
					<img
						height='100'
						width='100'
						src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
					/>
					<h2>Dance</h2>
				</Link>
				<Link
					to={`/users/${currentUser.id}/liked-songs`}
					onClick={() => addBackPath()}>
					<img
						height='100'
						width='100'
						src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
					/>
					<h2>Grooves</h2>
				</Link>
			</div>
			<div className='outer-div'>
				<Link
					to={`/users/${currentUser.id}/liked-songs`}
					onClick={() => addBackPath()}>
					<img
						height='100'
						width='100'
						src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
					/>
					<h2>Sleep</h2>
				</Link>
				<Link
					to={`/users/${currentUser.id}/liked-songs`}
					onClick={() => addBackPath()}>
					<img
						height='100'
						width='100'
						src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
					/>
					<h2>HYPE</h2>
				</Link>
				<Link
					to={`/users/${currentUser.id}/liked-songs`}
					onClick={() => addBackPath()}>
					<img
						height='100'
						width='100'
						src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
					/>
					<h2>Your Daily Mix</h2>
				</Link>
				<Link
					to={`/users/${currentUser.id}/liked-songs`}
					onClick={() => addBackPath()}>
					<img
						height='100'
						width='100'
						src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
					/>
					<h2>The Hits</h2>
				</Link>
			</div>
		</section>
	);
};

export default UserSuggestedLinks;
