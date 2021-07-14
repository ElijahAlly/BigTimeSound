import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import entities from './entities_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['entities', 'session', 'ui'],
};

const rootReducer = combineReducers({
	entities,
	session,
	errors,
	ui,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
