import Cookies from "js-cookie";

import {
  INCREMENT_SEARCH_COUNTER,
  RESET_SEARCH_COUNTER,
} from "./searchCounterActionTypes";

export const searchIncrementCounter = () => ({
  type: INCREMENT_SEARCH_COUNTER,
});
export const searchReset = (data) => ({
  type: RESET_SEARCH_COUNTER,
});

export const searchCounterIncrement = () => {
  return async (dispatch) => {
    let searchCount = Cookies.get("searchCount");
    if (!searchCount) {
      searchCount = 1;
    } else {
      searchCount = parseInt(searchCount) + 1;
    }
    Cookies.set("searchCount", searchCount);
  };
};
