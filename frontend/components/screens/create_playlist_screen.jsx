import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

const CreatePlaylistScreen = (props) => {
	props.fetchAllPlaylists(props.currentUser.id);

	let playlistNumber = 0;
	if (props.playlists) playlistNumber = props.playlists.length + 1;
	let state = { user_id: props.currentUser.id, name: `My Playlist #${playlistNumber}` };
	props.createPlaylist(state)

	let history = useHistory()

	history.push(`/users/${props.playlist.user_id}/playlist/${props.playlist.id}`);
	
	return <></>;
}

export default CreatePlaylistScreen;
