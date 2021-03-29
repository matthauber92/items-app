import appConstants from "./constants";

//TODO: ADD to player component as player reducer
export const initialState = {
  items: [],
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
        items: action.items,
        loading: false,
      };
    default:
      return state;
  }
}