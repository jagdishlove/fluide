
import { CURRENT_ROUTE_PAGE } from "../actions/routesData/routesDataActionTypes";
  
  const initialState = {
   currentPage:""
  };
  
  const currentPageReducer = (state = initialState, action) => {
    switch (action.type) {
     case CURRENT_ROUTE_PAGE:
        return {...state,currentPage:action.payload}
      default:
        return state;
    }
  };
  
  export default currentPageReducer;