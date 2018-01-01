import fetch from 'isomorphic-fetch';
// Local Deps:
import {
        apiUrl,
        defaultPaginationPage,
        defaultPaginationCountPerPage
      } from '../config/properties';
import { searchUrl } from '../constants/apiUrls';
import { mockSearchResults } from '../config/mockData/mockResultsData';
// Utils:
import { objectToQueryString } from '../utils/queryStringUtils';

const FAKE_REQUEST_DELAY_IN_MS = 1000;

export function getSearchResultsRequest(queryParams) {
  const queryString = objectToQueryString(queryParams);
  return fetch(
    `${apiUrl}${searchUrl}${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function fakeGetSearchResultsRequest(queryParams) {
  const page = queryParams.page || defaultPaginationPage;
  const startIndex = (page - 1) * defaultPaginationCountPerPage;
  const endIndex = startIndex + defaultPaginationCountPerPage;
  const {
          results,
          totalCount
        } = mockSearchResults;
  const parsedResults = [...results].slice(startIndex, endIndex);
  const response = {
    status: 200,
    ok: true,
    searchResultsData: {
      results: parsedResults,
      totalCount
    }
  };
  return new Promise(resolve => (
    setTimeout(
      () => resolve(response),
      FAKE_REQUEST_DELAY_IN_MS
    )
  ));
}
