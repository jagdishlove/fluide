import {
  ADD_WORD,
  STREAM_ENDED,
  STREAM_START,
} from "../actions/descriptionData/descriptionActionTypes";

const initialState = {
  words: [],
  streaming: true,
};

const streamingReducer = (state = initialState, action) => {
  switch (action.type) {
    case STREAM_START:
      return { ...state, words: [] };
    case ADD_WORD:
      return { ...state, words: [...state.words, action.payload] };
    case STREAM_ENDED:
      return { ...state, streaming: false };
    default:
      return state;
  }
};

export default streamingReducer;
