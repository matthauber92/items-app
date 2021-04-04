import api from '../api';

function getItems() {
  return api.get('api/Items/GetItems', { withCredentials: true, 'Access-Control-Allow-Origin': '*' })
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}

function addItem(item) {
  return api.post('api/Items/AddItem', item, { withCredentials: true, 'Access-Control-Allow-Origin': '*' })
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}

function updateItem(id, item) {
  return api.put(`api/Items/UpdateItem?id=${id}`, item, { withCredentials: true, 'Access-Control-Allow-Origin': '*' })
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}

function deleteItem(id) {
  return api.delete(`api/Items/${id}`, { withCredentials: true, 'Access-Control-Allow-Origin': '*' })
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}


export {
    getItems,
    addItem,
    updateItem,
    deleteItem,
};
