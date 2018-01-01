import { UPDATE_SEARCH_BAR } from '../../../constants/actions';

export function updateSearchBar(query) {
  return {
    type: UPDATE_SEARCH_BAR,
    query
  };
}
