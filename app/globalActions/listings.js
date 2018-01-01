import {
        GET_SEARCH_RESULTS_SUCCESS,
        GET_SEARCH_RESULTS_FAIL,
        GET_SEARCH_RESULTS_REQUEST
      } from '../constants/actions';
import { handleErrors } from '../utils/requestUtils';
import { getListingsRequest } from '../api/listingsApi';
import { defaultPaginationCountPerPage } from '../config/properties';

/*-----------------------------------
  GET SEARCH RESULTS (LISTINGS)
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

export function triggerSearchResultsRequest() {
  return {
    type: GET_SEARCH_RESULTS_REQUEST,
  };
}

export const getSearchResults = queryParams => async (dispatch) => {
  try {
    // Let UI know that we are triggering another request:
    dispatch(triggerSearchResultsRequest());
    // Add query defaults:
    const augmentedQueryParams = {
      ...queryParams,
      per_page: defaultPaginationCountPerPage
    };
    // Make Api Request
    const response = await getListingsRequest(augmentedQueryParams);

    handleErrors(response);
    const json = await response.json();

    const { listings, total } = json;
    dispatch(getSearchResultsSuccess({
      results: listings,
      totalCount: total
    }));
  }
  catch (err) {
    dispatch(getSearchResultsFail(err));
  }
};
