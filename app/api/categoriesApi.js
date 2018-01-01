import fetch from 'isomorphic-fetch';
// Local Deps:
import { apiUrl } from '../config/properties';
import { categoriesUrl } from '../constants/apiUrls';

export function getCategoriesRequest() {
  return fetch(
    `${apiUrl}${categoriesUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
