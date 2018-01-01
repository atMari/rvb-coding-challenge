import { browserHistory } from 'react-router';
// Local Deps:
import { objectToQueryString } from './queryStringUtils';
import {
        home,
        notFound,
        searchResults
      } from '../constants/routes';

export function forwardTo(location) {
  browserHistory.push(location);
}

export function forwardToNotFoundPage() {
  forwardTo(notFound);
}

export function forwardToHomePage() {
  forwardTo(home);
}
export function forwardToSearchResultsPage(queryObject) {
  const queryString = objectToQueryString(queryObject);
  const location = `${searchResults}${queryString}`;
  forwardTo(location);
}
