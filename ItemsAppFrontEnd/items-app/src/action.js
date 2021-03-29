import c from './constants';
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
        console.log(items);
        dispatch(success(items));
      },
      (error) => {
        dispatch(failure(error.toString()));
      },
    );
  };
}

export default ({
    GetItems,
});