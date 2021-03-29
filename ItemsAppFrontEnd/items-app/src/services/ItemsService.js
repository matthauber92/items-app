import api from '../common';

function getItems() {
  console.log("API CALLLL");
  return api.get('api/Items/GetItems', { withCredentials: true, 'Access-Control-Allow-Origin': '*' })
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}

export {
    getItems,
};
