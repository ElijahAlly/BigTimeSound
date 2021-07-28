import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ListWithPicture from '../items/song_items/list_with_picture'
import LikedSongsLibrary from '../items/liked_songs_library'
import PlaylistList from '../items/playlist_list'

class LibraryNavBtns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: 'playlists',
		};
	}

	render() {
		const { show } = this.state;
		const { history, userId, playlists, albums, artists } = this.props;

		return (
			<section className='library-nav-btns'>
				<button
					id='playlists-btn'
					className={show === 'playlists' ? 'library-btn selected-library-btn' : 'library-btn'}
					onClick={() => this.setState({ show: 'playlists' })}>
					Playlists
				</button>
				<button
					id='artists-btn'
					className={show === 'artists' ? 'library-btn selected-library-btn' : 'library-btn'}
					onClick={() => this.setState({ show: 'artists' })}>
					Artists
				</button>
				<button
					id='albums-btn'
					className={show === 'albums' ? 'library-btn selected-library-btn' : 'library-btn'}
					onClick={() => this.setState({ show: 'albums' })}>
					Albums
				</button>
                {show === 'playlists' ? (
                    <div className='library-items'>
                        <LikedSongsLibrary history={history} userId={userId}/>
                        <PlaylistList key={Math.random()} history={history} playlists={playlists.length > 0 ? playlists : null} userId={userId} />
                    </div>
                ) : <></>}
                {show === 'artists' ? (
                    <section className='library-items'>
                        <ListWithPicture key={Math.random()} history={history} artists={artists} userId={userId} />
                    </section>
                ) : <></>}
                {show === 'albums' ? (
                    <section className='library-items'>
                        <ListWithPicture key={Math.random()} history={history} albums={albums} userId={userId} />
                    </section>
                ) : <></>}
			</section>
		);
	}
}

const mSTP = ({entities}) => ({
    artists: Object.values(entities.artists),
    albums: Object.values(entities.albums),
    playlists: Object.values(entities.playlists),
})
 
export default withRouter(connect(mSTP)(LibraryNavBtns));
