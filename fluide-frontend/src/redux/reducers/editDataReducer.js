import {
 FETCH_PROFILE_SUCCESS
  } from "../actions/editData/editDataActionTypes";
  
  const initialState = {
    data: [],
  };
  
  const editProfileReducer = (state = initialState, action) => {
    switch (action.type) {

      case FETCH_PROFILE_SUCCESS:
        return { ...state, data: action.payload };

  
      default:
        return state;
    }
};

export default editProfileReducer;
