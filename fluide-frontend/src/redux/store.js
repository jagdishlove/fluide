import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import quizDataReducer from "./reducers/quizDataReducer";
import loadingReducer from "./reducers/loadingReducer";
import modalReducer from "./reducers/modalReducer";
import viewLessonReducer from "./reducers/viewLessonReducer";
import currentPageReducer from "./reducers/currentPageReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loadingReducer", "quizDataReducer", "viewLessonReducer"],
};

const logger = createLogger();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reducers = combineReducers({
  persistData: persistedReducer,
  nonPersistData: quizDataReducer,
  currentPageReducer,
  loadingReducer,
  modalReducer,
  viewLessonReducer,
});

const middleware = [thunk, logger];

const composeEnhancers = composeWithDevTools({});

export const store = createStore(reducers, applyMiddleware(...middleware));

export const persistor = persistStore(store);
