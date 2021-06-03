import { connect } from 'react-redux';
import { createUser, clearErrors } from '../../actions/user_actions';
import { createSession } from '../../actions/session_actions';
import SignUp from './signup';

const mSTP = (state) => ({
	currentUser: state.session.currentUser,
	errors: state.errors.user,
});

const mDTP = (dispatch) => ({
	createUser: (formUser) => dispatch(createUser(formUser)),
	login: (user) => dispatch(createSession(user)),
	clearErrors: () => dispatch(clearErrors()),
});

export default connect(mSTP, mDTP)(SignUp);
