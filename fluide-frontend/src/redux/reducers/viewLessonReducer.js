import { VIEW_LESSON } from "../actions/viewLessonAction/viewLessonActionTypes";

  const initialState = {
    viewLesson: "",
   
  };
  
  const viewLessonReducer = (state = initialState, action) => {
    switch (action.type) {
      case VIEW_LESSON:
        return { ...state, viewLesson: action.payload };
      default:
        return state;
    }
  };
  
  export default viewLessonReducer;
  