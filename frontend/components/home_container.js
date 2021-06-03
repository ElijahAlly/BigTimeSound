import { connect } from 'react-redux';
import { createSession } from '../actions/session_actions';
import Home from './home';

const mDTP = (dispatch) => ({
	login: (user) => dispatch(createSession(user)),
});

export default connect(null, mDTP)(Home);
