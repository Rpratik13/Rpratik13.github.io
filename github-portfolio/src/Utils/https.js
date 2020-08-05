const BASE_URL = 'https://api.github.com/';


export function get(url) {
  return fetch(`${BASE_URL}${url}`);
}