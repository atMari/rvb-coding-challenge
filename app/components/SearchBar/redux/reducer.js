import { handleAction } from '../../../utils/actionUtils';
import { UPDATE_SEARCH_BAR } from '../../../constants/actions';

const initialState = {
  searchBarText: '',
  selectedCategory: '',
  recommendations: []
};

const actionMappings = {
  [UPDATE_SEARCH_BAR]: '_updateSearchBar'
};

const reducer = {
  _updateSearchBar(state, {
    query
  }) {
    return {
      ...state,
      searchBarText: query
    };
  }
};

const searchBarReducer = (state = initialState, action) => (
  handleAction({ state, action, reducer, actionMappings })
);

export default searchBarReducer;
