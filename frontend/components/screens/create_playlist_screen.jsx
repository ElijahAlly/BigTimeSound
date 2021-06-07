import React, { Component } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

const CreatePlaylistScreen = (props) => {
	props.fetchAllPlaylists(props.currentUser.id);

	let playlistNumber = 0;
	if (props.playlists) playlistNumber = props.playlists.length + 1;
	let state = { user_id: props.currentUser.id, name: `My Playlist #${playlistNumber}` };
	props.createPlaylist(state)

	let history = useHistory()

	history.push(`/users/${props.playlist.user_id}/playlist/${props.playlist.id}`);
	
	return (
		<div className='create-playlist-screen'>
			
		</div>
	);
}

// class CreatePlaylistScreen extends Component {
// 	constructor(props) {
// 		super(props);
// 		const curUser = this.props.currentUser;
// 		let playlistNumber = 0;
// 		if (this.props.playlists) playlistNumber = this.props.playlists.length + 1;
// 		this.state = {
// 			user_id: curUser.id,
// 			name: `My Playlist #${playlistNumber}`,
// 		};

// 		this.handleSubmit = this.handleSubmit.bind(this);
// 		console.log('con', this.props);
// 		this.history = useHistory()
// 	}

// 	componentDidMount() {
// 		this.props.fetchAllPlaylists(this.props.currentUser.id);
// 		this.props
// 			.createPlaylist(this.state)
// 			.then((playlist) =>
// 				this.props.fetchPlaylist(
// 					playlist.playlist.user_id,
// 					playlist.playlist.id
// 				)
// 			);
// 	}

// 	handleInput(type) {
// 		return (e) => {
// 			this.setState({ [type]: e.target.value });
// 		};
// 	}

// 	handleSubmit(e) {
// 		e.preventDefault();
// 	}

// 	render() {
// 		console.log(this.props);
// 		if (this.props.playlist) {
// 			console.log('redirecting');
// 			this.history.push(`/users/${this.props.playlist.user_id}/playlist/${this.props.playlist.id}`)
// 			return null
// 			// () => (
// 			// 	<Redirect
// 			// 		to={`/users/${this.props.playlist.user_id}/playlist/${this.props.playlist.id}`}
// 			// 	/>
// 			// );
// 		} else {
// 			return (
// 				<div className='create-playlist-screen'>
// 					<form onSubmit={this.handleSubmit}>
// 						<label>
// 							Name:
// 							<input
// 								type='text'
// 								value={this.state.name}
// 								onChange={this.handleInput('name')}
// 							/>
// 						</label>
// 						<button>Create Playlist</button>
// 					</form>
// 				</div>
// 			);
// 		}
// 	}
// }

export default CreatePlaylistScreen;
