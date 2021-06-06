import { connect } from 'react-redux';
import { deleteSession } from '../../actions/session_actions';
import MainShowPage from './main_show_page';

const mSTP = (state, ownProps) => ({
	currentUser: state.entities.user[state.session.currentUser],
});

const mDTP = (dispatch) => ({
	logout: () => dispatch(deleteSession()),
});

export default connect(mSTP, mDTP)(MainShowPage);
