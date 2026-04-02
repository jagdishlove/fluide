import { combineReducers } from "redux";
import streamingReducer from "./descriptionDataStream";
import lessonModuleReducer from "./lessonModuleReducer";
import moduleReducer from "./moduleReducer";
import toastReducer from "./toastReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import editDataReducer from "./editDataReducer";
//import getProfileReducer from "./getProfileReducer";
import passwordReducer from "./passwordReducer";
const rootReducer = combineReducers({
  toast: toastReducer,
  moduleData: moduleReducer,
  registerData: registerReducer,
  lessonModuleReducer: lessonModuleReducer,
  streamingReducer: streamingReducer,
  profileData: editDataReducer,
  loginData: loginReducer,
 // getProfile: getProfileReducer,
});

export default rootReducer;
