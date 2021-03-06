import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
// Local Deps
import { searchResults } from '../constants/routes';
// Utils
import { objectToQueryString } from '../utils/queryStringUtils';
import { testArrayForMatchingString } from '../utils/regexUtils';
import { forwardTo } from '../utils/browserHistoryUtils';

// Function operates in case-insensitive manner
export function lookupConfigByString(config, lookupProp, str) {
  const stringToFind = str.toLowerCase();
  const key = config.find(item => (
    get(item, lookupProp).toLowerCase() === stringToFind
  ));
  return key;
}

export function parseCategoriesFromSearchText(searchText, availableCategories) {
  if (!searchText || isEmpty(availableCategories)) return [];
  const availableCategoryStrings = availableCategories.map(
    cat => cat.name.toLowerCase()
  );
  const preppedText = searchText.toLowerCase().trim();
  // Find matching category strings
  const matchingCategories = testArrayForMatchingString(
    availableCategoryStrings,
    preppedText
  );
  if (isEmpty(matchingCategories)) return matchingCategories;
  // Lookup category keys from strings
  const categoryKeys = matchingCategories.map((str) => {
    const config = lookupConfigByString(
      availableCategories,
      'name',
      str
    );
    if (!config) return null;
    return config.slug;
  });
  return categoryKeys;
}

export function parseQueryFromSearchText(searchText) {
  return searchText;
}

export function formatSearchResultLocation(category, query) {
  let queryString = '';
  if (!isEmpty(category)) {
    queryString = objectToQueryString({ category });
  }
  else {
    queryString = objectToQueryString({ query });
  }
  return `${searchResults}${queryString}`;
}

export function submitSearchForm({
  formValues,
  // initialValues,
  availableCategories
}) {
  const { searchBarText } = formValues;
  // Parse Category
  const category = parseCategoriesFromSearchText(searchBarText, availableCategories);
  // Parse Query
  const query = parseQueryFromSearchText(searchBarText);
  // Format location string
  const location = formatSearchResultLocation(category, query);
  return forwardTo(location);
}
