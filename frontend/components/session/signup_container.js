import { connect } from 'react-redux';
import { createUser, clearErrors } from '../../actions/user_actions';
import { createSession } from '../../actions/session_actions';
import { fetchAllSongs } from '../../actions/song_actions';
import SignUp from './signup';
import { resetPathCounts } from '../../actions/path_actions';

const mSTP = (state) => ({
	currentUser: state.session.currentUser,
	errors: state.errors.user,
});

const mDTP = (dispatch) => ({
	createUser: (formUser) => dispatch(createUser(formUser)),
	login: (user) => dispatch(createSession(user)),
	clearErrors: () => dispatch(clearErrors()),
	fetchAllSongs: () => dispatch(fetchAllSongs()),
	resetPathCounts: () => dispatch(resetPathCounts()),
});

export default connect(mSTP, mDTP)(SignUp);
