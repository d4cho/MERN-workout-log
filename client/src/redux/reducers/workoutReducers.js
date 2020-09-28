import {
  SAVE_CURRENT_EXERCISE,
  SET_CURRENT_EXERCISE,
  CLEAR_CURRENT_EXERCISE,
  DELETE_SET,
  SAVE_WORKOUT
} from '../actions/types';

const initialState = { currentExercise: { info: [] }, previousExercises: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_EXERCISE:
      return {
        ...state,
        currentExercise: {
          name: action.payload.name,
          info: [...state.currentExercise.info, action.payload.info]
        }
      };

    case SAVE_CURRENT_EXERCISE:
      return {
        ...state,
        previousExercises: [...state.previousExercises, action.payload]
      };

    case CLEAR_CURRENT_EXERCISE:
      return {
        ...state,
        currentExercise: { info: [] }
      };

    case DELETE_SET:
      let info = [...state.currentExercise.info];
      info.splice(action.payload, 1);
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          info
        }
      };

    case SAVE_WORKOUT:
      return {
        ...initialState,
        msg: action.payload.msg
      };

    default:
      return state;
  }
};
