// Global Deps
import fetch from 'isomorphic-fetch';
// Local Deps
import {
  get,
  post
} from '../constants/requestTypes';

const { rvbLocalStorage } = window;

export function handleErrors(response, ignore401 = false) {
    if (response.status === 401 && !ignore401) console.error(response.stack());
    if (!response.ok) throw Error(response.statusText);
    return response;
}

export function getBaseApiUrl() {
  return rvbLocalStorage.getItem('rvbApiUrl');
}

export async function formatRequestUrl(url) {
  const baseApiUrl = await getBaseApiUrl();

  return `${baseApiUrl}${url}`;
}

export function formatRequestBody(body) {
  return (typeof body === 'string') ? body : JSON.stringify(body);
}

export function sendPost({ headers, url, body }) {
  const bodyString = formatRequestBody(body);
  const path = formatRequestUrl(url);
  return fetch(path, {
    method: post,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: bodyString
  });
}

export function sendGet({ headers, url, params }) {
  const path = formatRequestUrl(url);
  return fetch(path, {
    method: get,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    params
  });
}
