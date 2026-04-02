import { toast } from "react-toastify";
import { ADD_WORD, STREAM_ENDED, STREAM_START } from "./descriptionActionTypes";
import { serverAddress } from "../../../config";

export const addWords = (newWord) => ({ type: ADD_WORD, payload: newWord });
export const openStream = () => ({ type: STREAM_START });

export const stopStreaming = () => ({
  type: STREAM_ENDED,
});

export const startStreaming = (data) => {
  return async (dispatch, getState) => {
    dispatch(openStream());
    const eventSource = new EventSource(
      `${serverAddress}/description?module_name=Grammar Basics&level=easy&language=english&lesson_name=Nouns&activity_name=Types of Nouns`
    );

    eventSource.onmessage = (event) => {
      const newWords = event.data.split(" ");
      dispatch(addWords(newWords));
    };

    eventSource.onopen = (event) => {
      console.log("Connection opened");
      dispatch(openStream());
    };

    eventSource.onerror = (error) => {
      console.log("Connection error", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };
};
