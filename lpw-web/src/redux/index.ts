import { connectRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { throttle } from 'lodash';
import { localizeReducer } from 'react-localize-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { loadState, saveState } from './local.storage';

export const rootEpic = combineEpics();

export const browserHistory = createBrowserHistory();

const epicMiddleware = createEpicMiddleware();
const reducer = combineReducers({
	localize: localizeReducer,
});

const persistedState = loadState();
const reduxStore = createStore(
	connectRouter(browserHistory)(reducer),
	persistedState,
	compose(
		applyMiddleware(
			epicMiddleware,
			routerMiddleware(browserHistory)
		)
	)
);

epicMiddleware.run(rootEpic);

export const saveStore = () => {

	const state = reduxStore.getState();
	saveState({});

};

// we want to save the auth state of the application
reduxStore.subscribe(throttle(saveStore, 1000));

export default reduxStore;
