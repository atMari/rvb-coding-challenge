// Global Deps
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
// Local Reducers
import search from '../components/SearchBar/redux/reducer';
import home from '../pages/Home/redux/reducer';
import searchResults from '../pages/SearchResults/redux/reducer';

const reducers = combineReducers({
  search,
  home,
  searchResults,
  form: formReducer,
  routing: routerReducer,
});

export default reducers;
