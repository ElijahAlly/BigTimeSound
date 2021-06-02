import { connect } from 'react-redux';
import { createSession } from '../../actions/session_actions';
import Login from './login';

const mSTP = (state) => ({
	currentUser: state.session.currentUser,
});

const mDTP = (dispatch) => {
	return {
		login: (formUser) => dispatch(createSession(formUser)),
	};
};

export default connect(mSTP, mDTP)(Login);
