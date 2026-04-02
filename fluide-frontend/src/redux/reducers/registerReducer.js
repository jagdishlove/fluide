import {
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILURE,
} from "../actions/registerData/registerActionTypes";

const initialState = {
  data: [],
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGISTER_REQUEST:
      return { ...state };
    case FETCH_REGISTER_SUCCESS:
      return { ...state };
    case FETCH_REGISTER_FAILURE:
      return { ...state };

    default:
      return state;
  }
};

export default registerReducer;
