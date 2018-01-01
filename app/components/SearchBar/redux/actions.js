import { UPDATE_SEARCH_BAR } from '../../../constants/actions';
// Utils:
import { forwardTo } from '../../../utils/browserHistoryUtils';
import {
        parseCategoryFromSearchText,
        parseQueryFromSearchText,
        formatSearchResultLocation
      } from '../../../utils/searchUtils';

export function submitSearchForm({
  formValues,
  /* initialValues */
}) {
  const { searchBarText } = formValues;
  // Parse Category
  const category = parseCategoryFromSearchText(searchBarText);
  // Parse Query
  const query = parseQueryFromSearchText(searchBarText);
  // Format location string
  const location = formatSearchResultLocation(category, query);
  return forwardTo(location);
}

export function updateSearchBar(query) {
  return {
    type: UPDATE_SEARCH_BAR,
    query
  };
}
