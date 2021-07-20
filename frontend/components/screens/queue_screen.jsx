import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleColorShift } from '../../util/header_color_switch';
import SongItem from '../items/song_item';

class QueueScreen extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		handleColorShift('#1a1818');
		const main = document.getElementById('main');
		main.style.background = '#1a1818';
	}

	shouldComponentUpdate(nextProps) {
		if (
			this.props.queue !== nextProps.queue ||
			this.props.shuffledIsOn !== nextProps.shuffledIsOn
		)
			return true;
		return false;
	}

	render() {
		const { queue, currentlyPlaying, playingFrom } = this.props;
		console.log(currentlyPlaying);
		console.log(queue);
		return (
			<div className='screen queue-screen'>
				<section id='queue-container'>
					<h1 id='header'>Queue</h1>
					<h3 id='now-playing-title'>Now Playing</h3>
					<SongItem song={currentlyPlaying} fromWhere={playingFrom} />
					<h3 id='next-up-title'>Next Up</h3>
					<section>
						<ul className='song-list queue-list'>
							{queue.length > 0 ? (
								queue.map((song, i) => (
									<SongItem
										number={i + 1}
										key={i}
										song={song}
										songList={queue}
										fromWhere={playingFrom}
									/>
								))
							) : (
								<li>No Songs</li>
							)}
						</ul>
					</section>
				</section>
			</div>
		);
	}
}

const mSTP = ({ ui, entities }, ownProps) => ({
	queue: ui.queue.songQueue,
	currentlyPlaying: ui.currentlyPlaying.song,
	shuffledIsOn: ui.currentlyPlaying.shuffledIsOn,
	playingFrom: ui.currentlyPlaying.playingFrom,
});

const mDTP = (dispatch) => ({});

export default connect(mSTP, null)(QueueScreen);
