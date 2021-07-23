import React, { Component } from 'react';

class MoreSongActions extends Component {
	constructor(props) {
		super(props);
	}

    shouldComponentUpdate(nextProps) {
        if (this.props.songId !== nextProps.songId) return true;
        return false;
    }

	componentDidMount() {
		const songActionsBtn = document.getElementById(`actions-btn-${this.props.songId}`);
		const songActions = document.getElementsByClassName(`actions-${this.props.songId}`)[0];

		document.body.addEventListener('click', (e) => {
			if ((songActions.style.display === 'none' || songActions.style.display === '') && e.path[0] === songActionsBtn) {
				songActions.style.display = 'flex';
                songActions.style.right = `${e.clientX - 1370}px`
                songActions.style.top = `${e.clientY - 0}px`
				return;
			} else if (songActions.style.display === 'flex' && (e.path[0] !== songActionsBtn || e.path[1] !== songActions)) {
                songActions.style.display = 'none';
                return;
            }
		});
	}

	render() {
		const { fromWhere, songId } = this.props;
		// fromWhere options -> ['liked-songs', 'search', '<any playlist name (any string)>']
		// let liked
		// check to see if song is in likes (liked) to conditionally display 'remove from your liked songs'/'add to your liked songs'
		// check to see if in a playlist to conditionally display 'remove from this playlist'
		// always display 'add to playlist'-> displays another section containing list of playlists
		// always display 'add to queue'
		// always display, 'go to artist/album'
		return (
			<section className='more-song-actions-container'>
				<i
					className='fas fa-ellipsis-h more-song-actions-btn'
					id={`actions-btn-${songId}`}></i>
				<section className={`song-actions actions-${songId}`}>
					<button className='play-next-btn'>Play next</button>
					<button className='artist-btn'>Go to artist</button>
					<button className='album-btn'>Go to album</button> 
					<button className='liked-songs-btn'>Save to/Remove from your Liked Songs</button> 
					<button className='playlist'>Add to playlist/Remove from this playlist</button> {/* add to playlist has arrow */}
				</section>
			</section>
		);
	}
}

export default MoreSongActions;
