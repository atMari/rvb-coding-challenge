import { handleAction } from '../../../utils/actionUtils';
import {
        UPDATE_SEARCH_BAR,
        GET_CATEGORIES_SUCCESS
      } from '../../../constants/actions';

const initialState = {
  searchBarText: '',
  selectedCategory: '',
  availableCategories: [],
  isFetchingCategories: true,
};

const actionMappings = {
  [UPDATE_SEARCH_BAR]: '_updateSearchBar',
  [GET_CATEGORIES_SUCCESS]: '_getCategoriesSuccess'
};

const reducer = {
  _updateSearchBar(state, {
    query
  }) {
    return {
      ...state,
      searchBarText: query
    };
  },
  _getCategoriesSuccess(state, {
    categories
  }) {
    return {
      ...state,
      availableCategories: categories,
      isFetchingCategories: false
    };
  }
};

const searchBarReducer = (state = initialState, action) => (
  handleAction({ state, action, reducer, actionMappings })
);

export default searchBarReducer;
