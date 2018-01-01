import { handleAction } from '../../../utils/actionUtils';
import {
        GET_SEARCH_RESULTS_SUCCESS,
        GET_SEARCH_RESULTS_FAIL,
        GET_SEARCH_RESULTS_REQUEST
      } from '../../../constants/actions';

const initialState = {
  results: [],
  resultsCount: 0,
  isFetchingResults: true,
  fetchResultsError: ''
};

const actionMappings = {
  [GET_SEARCH_RESULTS_SUCCESS]: '_getSearchResultsSuccess',
  [GET_SEARCH_RESULTS_FAIL]: '_getSearchResultsFail',
  [GET_SEARCH_RESULTS_REQUEST]: '_getSearchResultsRequest'
};

const reducer = {
  _getSearchResultsSuccess(state, {
    results,
    totalCount,
  }) {
    return {
      ...state,
      results,
      resultsCount: totalCount,
      isFetchingResults: false
    };
  },

  _getSearchResultsFail(state, {
      error
    }) {
    return {
      ...state,
      fetchResultsError: error,
      isFetchingResults: false
    };
  },

  _getSearchResultsRequest(state) {
    return {
      ...state,
      isFetchingResults: true,
      fetchResultsError: ''
    };
  }
};

const searchReducer = (state = initialState, action) => (
  handleAction({ state, action, reducer, actionMappings })
);

export default searchReducer;
