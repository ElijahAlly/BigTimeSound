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
import ListWithPicture from '../items/song_items/list_with_picture';
import PlaylistSongsList from '../items/song_items/playlist_songs_list';

class AlbumScreen extends Component {
	constructor(props) {
		super(props);

		this.togglePlay = this.togglePlay.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		handleColorShift('#00000042');
		const main = document.getElementById('main');
		main.style.background = '#00000042';
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
			artist,
			shuffleIsOn,
		} = this.props;

		if (isPlaying) {
			pauseSong();

			if (playingFrom === artist.name) {
				return;
			}

			if (!song) {
				if (shuffleIsOn) songs = shuffleArray(songs);
				song = songs.shift();
				audio = new Audio(song.url);
			}

			playSong(song, audio, artist.name, currentTime, volume, audio.duration);
			return;
		}

		let playSongFirst = songs.shift();
		let newAudio = new Audio(playSongFirst.url);
		receiveSongQueue(songs);
		playSong(
			playSongFirst,
			newAudio,
			artist.name,
			currentTime,
			volume,
			newAudio.duration
		);
	}

	render() {
		const { album, songs, artist, history, userId } = this.props;
		const { url } = album ? album : { url: '' };
		const { id, name } = artist;

		return (
			<section className='screen artist-screen'>
				<section className='header'>
					<div className='img-container'>
						{new Array(10).fill().map((_, i) => (
							<img key={i} src={url} />
						))}
					</div>
					<div className='title'>
						<h3>
							<svg
								className='verified'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M12 21.6596l-3.38079 1.8543-1.84158-3.3877-3.84662-.2679.28231-3.8456-3.09118-2.3049 2.31658-3.0825-1.3543-3.61028 3.61534-1.34071.81255-3.76935 3.76627.82672L12 0l2.7214 2.73168 3.7663-.82672.8125 3.76935 3.6154 1.34071-1.3543 3.61028 2.3166 3.0825-3.0912 2.3049.2823 3.8456-3.8466.2679-1.8416 3.3877L12 21.6596z'
									fill='#2E77D0'></path>
								<path
									d='M16.8637 7.41226l-6.6435 7.77824-2.80421-3.2842-.4935.5775 3.29771 3.8617 7.2135-8.44649-.57-.48675z'
									fill='#fff'></path>
							</svg>
							<div>
								Verified Artist
							</div>
						</h3>
						<h1>{formatName(name, 100)}</h1>
						{/* song count && total album duration */}
					</div>
				</section>

				<PlaylistPlayButton togglePlay={this.togglePlay} fromWhere={name} />

				<div className='popular-songs'>
					Popular
				</div>

				<PlaylistSongsList
					key={id}
					songs={songs}
					playlistName={name}
					albumId={id}
					onAlbumPage={true}
				/>

				<h1 className='section-header'>Albums</h1>
				<ListWithPicture key={Math.random()} history={history} albums={[album]} shouldSlice={true} userId={userId} />
			</section>
		);
	}
}

const mSTP = ({ entities, ui, session }, ownProps) => {
	const artistId = ownProps.match.params.id;
	return {
		artist: entities.artists[artistId],
		album: entities.albums[artistId],
		playingFrom: ui.currentlyPlaying.playingFrom,
		isPlaying: ui.currentlyPlaying.isPlaying,
		song: ui.currentlyPlaying.song,
		audio: ui.currentlyPlaying.audio,
		volume: ui.currentlyPlaying.volume,
		shuffleIsOn: ui.currentlyPlaying.shuffleIsOn,
		userId: session.currentUser,
		songs: selectSongsForAlbumOrArtist(entities.songs, artistId, 'artist_id'),
	};
};

const mDTP = (dispatch) => ({
	playSong: (song, audio, playingFrom, currentTime, volume, duration) =>
		dispatch(playSong(song, audio, playingFrom, currentTime, volume, duration)),
	pauseSong: () => dispatch(pauseSong()),
	receiveSongQueue: (songs) => dispatch(receiveSongQueue(songs)),
});

export default withRouter(connect(mSTP, mDTP)(AlbumScreen));
