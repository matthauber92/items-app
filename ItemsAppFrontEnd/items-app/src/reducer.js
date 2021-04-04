import appConstants from "./constants";

export const initialState = {
  items: [],
  item: {},
  hasError: false,
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case appConstants.GET_ITEMS_REQUEST:
      return {
        ...state,
        items: [],
        loading: true,
      };
    case appConstants.GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.items.data,
        loading: false,
      };
    case appConstants.GET_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.error,
      };
    case appConstants.ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case appConstants.ADD_ITEM_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        hasError: false,
        item: action.item.data,
      };
    case appConstants.ADD_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.error,
      };
    case appConstants.UPDATE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case appConstants.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        hasError: false,
        item: action.item.data,
      };
    case appConstants.UPDATE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.error,
      };
    case appConstants.DELETE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case appConstants.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        hasError: false,
        item: {},
      };
    case appConstants.DELETE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.error,
      };
    default:
      return state;
  }
}