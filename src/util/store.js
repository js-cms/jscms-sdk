/**
 * 封装 localStorage
 * @param {string} key 
 * @param {any} value
 */
export default function store(key, value) {
  let storeObject = localStorage.jscms;
  if (storeObject) {
    storeObject = JSON.parse(storeObject);
  } else {
    storeObject = {};
  }
  if (!value) {
    return storeObject[key];
  } else {
    storeObject[key] = value;
    localStorage.jscms = JSON.stringify(storeObject);
  }
}