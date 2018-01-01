
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../globalReducers/root';

const router = routerMiddleware(browserHistory);

const enhancer = applyMiddleware(thunkMiddleware, router);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
