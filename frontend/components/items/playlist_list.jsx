import React from 'react';
import { formatName } from '../../util/general_functions/format_name';
import { playlistPics } from '../../util/general_functions/playlist_pictures';

const PlaylistList = ({ playlists, history, userId }) => {

	return (
		<>
			{playlists ? (
				<>
					{playlists.map((playlist, i) => (
						<div
							className='li-background playlists'
							key={i}
							onClick={() =>
								history.push(`/users/${userId}/playlist/${playlist.id}`)
							}>
							<img
								className='list-img'
								src={playlistPics[i]}
							/>
							<h3 className='list-name'>{formatName(playlist.name, 18)}</h3>
						</div>
					))}
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default PlaylistList;
