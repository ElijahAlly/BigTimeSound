import { connect } from 'react-redux';
import { createUser } from '../../actions/user_actions';
import SignUp from './signup';

const mSTP = (state) => ({
	currentUser: state.session.currentUser,
});

const mDTP = (dispatch) => ({
	createUser: (formUser) => dispatch(createUser(formUser)),
});

export default connect(mSTP, mDTP)(SignUp);
