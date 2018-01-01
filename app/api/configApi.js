import fetch from 'isomorphic-fetch';
import { handleErrors } from '../utils/requestUtils';

const configUrl = '/config.json';

export default function getConfig() {
  return fetch(configUrl)
    .then(handleErrors)
    .then(response => response.json())
    .then(json => JSON.parse(json));
}
