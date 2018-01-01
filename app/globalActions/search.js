import {
        GET_SEARCH_RESULTS_SUCCESS,
        GET_SEARCH_RESULTS_FAIL,
        GET_SEARCH_RESULTS_REQUEST
      } from '../constants/actions';
import { handleErrors } from '../utils/requestUtils';
import { fakeGetSearchResultsRequest } from '../api/searchResultsApi';

/*-----------------------------------
  GET SEARCH RESULTS
-------------------------------------*/
export function getSearchResultsSuccess({
  results,
  totalCount
}) {
  return {
    type: GET_SEARCH_RESULTS_SUCCESS,
    results,
    totalCount
  };
}

export function getSearchResultsFail(error) {
  return {
    type: GET_SEARCH_RESULTS_FAIL,
    error
  };
}

export function getSearchResultsRequest() {
  return {
    type: GET_SEARCH_RESULTS_REQUEST,
  };
}

export const getSearchResults = queryParams => async (dispatch) => {
  try {
    dispatch(getSearchResultsRequest());
    // const response = await getSearchResultsRequest(queryParams);
    const response = await fakeGetSearchResultsRequest(queryParams);

    handleErrors(response);
    // const json = await response.json();
    const json = response;

    const {
      results,
      totalCount
    } = json.searchResultsData;
    dispatch(getSearchResultsSuccess({
      results,
      totalCount
    }));
  }
  catch (err) {
    dispatch(getSearchResultsFail(err));
  }
};
