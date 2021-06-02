import { connect } from 'react-redux';
import { createUser } from '../../actions/user_actions';
import SignUp from './signup';

const mDTP = (dispatch) => {
	return {
		createUser: (formUser) => dispatch(createUser(formUser)),
	};
};

export default connect(null, mDTP)(SignUp);