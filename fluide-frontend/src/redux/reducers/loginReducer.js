import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GOOGLE_LOGIN_SUCCESS,
} from "../actions/Login/LoginActionType";
import { LOGOUT } from "../actions/registerData/registerActionTypes";
import {
  DELETE_PROFILE_FAILURE,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
} from "../actions/deleteProfile/deleteProfileActionType";
import { FETCH_PROFILE_SUCCESS } from "../actions/editData/editDataActionTypes";
import { FETCH_PASSWORD_SUCCESS } from "../actions/password/passwordActionType";
const initialState = {
  data: [],
  isLoggedIn: false,
  isLoggedOut: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, data: [] };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoggedIn: true,
        isLoggedOut: false,
        isGoogle:false
      };
    case LOGIN_ERROR:
      return { ...state, data: [] };
    case LOGOUT:
      return { ...state, data: [], isLoggedIn: false, isLoggedOut: true };

    case DELETE_PROFILE_REQUEST:
      return { ...state, data: [] };
    case DELETE_PROFILE_SUCCESS:
      return { ...state, data: [], isLoggedIn: false, isLoggedOut: true };
    case DELETE_PROFILE_FAILURE:
      return { ...state };
    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoggedIn: true,
        isLoggedOut: false,
        isGoogle:true
      };
     
      case FETCH_PROFILE_SUCCESS:
        return { ...state, data: action.payload };
        case FETCH_PASSWORD_SUCCESS:
          return { ...state, data: [] };
 
    default:
      return state;
  }
};

export default loginReducer;
