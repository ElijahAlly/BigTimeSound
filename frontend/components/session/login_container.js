import { connect } from 'react-redux';
import { resetPathCounts } from '../../actions/path_actions';
import { createSession, clearErrors } from '../../actions/session_actions';
import { fetchAllSongs } from '../../actions/song/song_actions';
import Login from './login';

const mSTP = (state) => ({
	currentUser: state.session.currentUser,
	errors: state.errors.session,
});

const mDTP = (dispatch) => ({
	login: (formUser) => dispatch(createSession(formUser)),
	clearErrors: () => dispatch(clearErrors()),
	fetchAllSongs: () => dispatch(fetchAllSongs()),
	resetPathCounts: () => dispatch(resetPathCounts())
});

export default connect(mSTP, mDTP)(Login);
