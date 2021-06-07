import { connect } from 'react-redux';
import { createPlaylist } from '../../actions/playlist_actions';
import CreatePlaylistScreen from './create_playlist_screen';

const mSTP = ({ entities: { user }, session }, ownProps) => ({
	currentUser: user[session.currentUser],
});

const mDTP = (dispatch) => ({
	createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
});

export default connect(mSTP, mDTP)(CreatePlaylistScreen);
