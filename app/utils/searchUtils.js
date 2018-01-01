import camelCase from 'lodash/camelCase';
// Local Deps
import searchCategories from '../constants/searchCategories';
import { searchResults } from '../constants/routes';
import { objectToQueryString } from '../utils/queryStringUtils';

export function parseCategoryFromSearchText(searchText) {
  const category = camelCase(searchText);
  return searchCategories[category];
}

export function parseQueryFromSearchText(searchText) {
  return searchText;
}

export function formatSearchResultLocation(category, query) {
  let queryString = '';
  if (category) {
    queryString = objectToQueryString({ category });
  }
  else {
    queryString = objectToQueryString({ query });
  }
  return `${searchResults}${queryString}`;
}
