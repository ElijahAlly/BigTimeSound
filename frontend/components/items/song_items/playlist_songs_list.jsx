import React, { Component } from 'react';
import { connect } from 'react-redux';
import SongItem from './song_item';
import { selectSongsForPlaylist } from '../../../util/general_functions/select_songs_for_playlist';

class PlaylistSongsList extends Component {
	render() {
		const { songs, playlistName, playlistId } = this.props;
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
						/>
					))}
				</ul>
			</section>
		);
	}
}

const mSTP = ({ entities }, ownProps) => ({
	playlistIds: entities.playlistIds.playlistIds,
	songs: selectSongsForPlaylist(
		entities.songs,
		entities.playlistIds.playlistIds,
		ownProps.playlistId
	),
});

export default connect(mSTP)(PlaylistSongsList);
