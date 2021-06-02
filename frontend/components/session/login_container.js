import { connect } from 'react-redux';
import { createSession, clearErrors } from '../../actions/session_actions';
import Login from './login';

const mSTP = (state) => ({
	currentUser: state.session.currentUser,
	errors: state.errors.session
});

const mDTP = (dispatch) => ({
	login: (formUser) => dispatch(createSession(formUser)),
	clearErrors: () => dispatch(clearErrors()),
});

export default connect(mSTP, mDTP)(Login);
