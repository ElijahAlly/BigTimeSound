import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

//////// for development ////////
import * as sessionActions from './actions/session_actions'

const store = configureStore();
window.getState = store.getState;
window.dispatch = store.dispatch;

window.createsession = sessionActions.createSession;
window.deletesession = sessionActions.deleteSession;
/////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('root');
	ReactDOM.render(<Root store={store} />, root);
});
