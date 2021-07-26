import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { playSong, pauseSong } from '../../actions/song/currently_playing';
import { receiveSongQueue } from '../../actions/song/song_queue_actions';
import { formatName } from '../../util/general_functions/format_name';
import { handleColorShift } from '../../util/general_functions/header_color_switch';
import { selectSongsForAlbumOrArtist } from '../../util/general_functions/select_songs_for_playlist';
import { shuffleArray } from '../../util/general_functions/shuffle_array';
import PlaylistPlayButton from '../items/playlist_play_button';
import PlaylistSongsList from '../items/song_items/playlist_songs_list';
import SongListHeader from '../items/song_list_header';

class AlbumScreen extends Component {
	constructor(props) {
		super(props);

		this.togglePlay = this.togglePlay.bind(this);
	}

    componentDidMount() {
        window.scrollTo(0, 0);
		handleColorShift('#5f5f5f');
		const main = document.getElementById('main');
		main.style.background = '#383838cf';
    }

	togglePlay() {
		let {
			playingFrom,
			audio,
			song,
			isPlaying,
			pauseSong,
			currentTime,
			playSong,
			receiveSongQueue,
			volume,
			songs,
			album,
			shuffleIsOn,
		} = this.props;

		if (isPlaying) {
			pauseSong();

			if (playingFrom === album.name) {
				return;
			}

			if (!song) {
				if (shuffleIsOn) songs = shuffleArray(songs);
				song = songs.shift();
				audio = new Audio(song.url);
			}

			playSong(song, audio, album.name, currentTime, volume, audio.duration);
			return;
		}

		let playSongFirst = songs.shift();
		let newAudio = new Audio(playSongFirst.url);
		receiveSongQueue(songs);
		playSong(
			playSongFirst,
			newAudio,
			album.name,
			currentTime,
			volume,
			newAudio.duration
		);
	}

	render() {
		const { album, songs } = this.props;
		const { id, url, artist, name } = album
			? album
			: { id: null, url: '', artist: '', url: '', name: '' };

		return (
			<section className='screen album-screen'>
				<section className='header'>
					<img src={url} />
					<div className='title'>
						<h3>ALBUM</h3>
						<h1>{formatName(name, 100)}</h1>
						<h3 className='artist-name'>{formatName(artist, 30)}</h3>
						{/* song count && total album duration */}
					</div>
				</section>

				<PlaylistPlayButton togglePlay={this.togglePlay} fromWhere={name} />

				<SongListHeader onAlbumPage={true} />

				<PlaylistSongsList
					key={id}
					songs={songs}
					playlistName={name}
					albumId={id}
					onAlbumPage={true}
				/>
			</section>
		);
	}
}

const mSTP = ({ entities, ui }, ownProps) => {
	const albumId = ownProps.match.params.id;
	return {
		album: entities.albums[albumId],
		playingFrom: ui.currentlyPlaying.playingFrom,
		isPlaying: ui.currentlyPlaying.isPlaying,
		song: ui.currentlyPlaying.song,
		audio: ui.currentlyPlaying.audio,
		volume: ui.currentlyPlaying.volume,
		shuffleIsOn: ui.currentlyPlaying.shuffleIsOn,
		songs: selectSongsForAlbumOrArtist(entities.songs, albumId, 'album_id'),
	};
};

const mDTP = (dispatch) => ({
	playSong: (song, audio, playingFrom, currentTime, volume, duration) =>
		dispatch(playSong(song, audio, playingFrom, currentTime, volume, duration)),
	pauseSong: () => dispatch(pauseSong()),
	receiveSongQueue: (songs) => dispatch(receiveSongQueue(songs)),
});

export default withRouter(connect(mSTP, mDTP)(AlbumScreen));
