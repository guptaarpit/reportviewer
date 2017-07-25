import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxPromise from 'redux-promise-middleware';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import cookie from 'react-cookie';
import ReactGA from 'react-ga';
import routes from './routes';
import { AUTH_USER } from './actions/types';
import reducers from './reducers/index';

// Import stylesheets
import './public/stylesheets/base.scss';

// Initialize Google Analytics
ReactGA.initialize('UA-000000-01');

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}
const reducer = storage.reducer(reducers);
const engine = createEngine('my-save-key');
const storageMiddleware = storage.createMiddleware(engine);
// const createStoreWithMiddleware = applyMiddleware(reduxThunk, reduxPromise())(createStore);
const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk, reduxPromise(), storageMiddleware)));
const load = storage.createLoader(engine);
const token = cookie.load('token');

load(store);
if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.querySelector('.wrapper'));
