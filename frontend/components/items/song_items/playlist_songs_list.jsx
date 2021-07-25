import React, { Component } from 'react';
import { connect } from 'react-redux';
import SongItem from './song_item';
import { selectSongsForPlaylist } from '../../../util/general_functions/select_songs_for_playlist';

class PlaylistSongsList extends Component {
	render() {
		let { songs, playlistName, playlistId, onAlbumPage } = this.props;
		console.log(songs);
		return (
			<section className='song-list-container'>
				<ul className='song-list'>
					{songs.map((song, i) => (
						<SongItem
							number={i + 1}
							key={i}
							song={song}
							songList={songs}
							fromWhere={playlistName}
							playlistId={playlistId}
							onAlbumPage={onAlbumPage}
						/>
					))}
				</ul>
			</section>
		);
	}
}

const mSTP = ({ entities }, ownProps) => ({
	playlistIds: entities.playlistIds.playlistIds,
	songs: ownProps.songs ? ownProps.songs : selectSongsForPlaylist(
		entities.songs,
		entities.playlistIds.playlistIds,
		ownProps.playlistId
	),
});

export default connect(mSTP)(PlaylistSongsList);
