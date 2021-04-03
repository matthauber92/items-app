import c from './constants';
import { toast } from "react-toastify";
import { ItemsService } from './services';

function GetItems() {
  function request() { return { type: c.GET_ITEMS_REQUEST }; }
  function success(items) {
    return { type: c.GET_ITEMS_SUCCESS, items };
  }
  function failure(error) {
    return { type: c.GET_ITEMS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    ItemsService.getItems().then((items) => {
        dispatch(success(items));
      },
      (error) => {
        dispatch(failure(error.toString()));
      },
    );
  };
}

function AddItem(item) {
  function request() { return { type: c.ADD_ITEM_REQUEST }; }
  function success(item) {
    return { type: c.ADD_ITEM_SUCCESS, item };
  }
  function failure(error) {
    return { type: c.ADD_ITEM_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    ItemsService.addItem(item).then(() => {
        dispatch(success(item));
        toast(`Successfully added ${item.ItemName}`);
        this.GetItems();  
      },
      (error) => {
        dispatch(failure(error.toString()));
      },
    );
  };
}

function UpdateItem(id, item) {
  function request() { return { type: c.UPDATE_ITEM_REQUEST }; }
  function success(item) {
    return { type: c.UPDATE_ITEM_SUCCESS, item };
  }
  function failure(error) {
    return { type: c.UPDATE_ITEM_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    ItemsService.updateItem(id, item).then(() => {
        dispatch(success(item));
        toast(`Successfully updated ${item.ItemName}`); 
      },
      (error) => {
        dispatch(failure(error.toString()));
      },
    );
  };
}

function DeleteItem(item) {
  function request() { return { type: c.DELETE_ITEM_REQUEST }; }
  function success(id) {
    return { type: c.DELETE_ITEM_SUCCESS, id };
  }
  function failure(error) {
    return { type: c.DELETE_ITEM_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    ItemsService.deleteItem(item.id).then(() => {
        dispatch(success(item.id));
        toast(`Removed ${item.itemName}`); 
      },
      (error) => {
        dispatch(failure(error.toString()));
      },
    );
  };
}

export default ({
    GetItems,
    AddItem,
    UpdateItem,
    DeleteItem,
});