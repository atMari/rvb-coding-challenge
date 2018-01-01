/* eslint no-undef:0 import/imports-first:0 */

import 'babel-polyfill';
import './index.html';
import './scss/app.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './config/routes';
import configureStore from './store/configureStore';
import config from './config/config';

window.reverbLocalStorage = config;

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const rootEl = document.getElementById('app');

reverbLocalStorage.setItem('reverbApiUrl', 'https://reverb.com/api/');

render(
  <Provider store={store}>
    <Router history={history}
            routes={routes} />
  </Provider>, rootEl);
