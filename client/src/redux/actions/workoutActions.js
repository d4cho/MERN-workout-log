import axios from 'axios';
import {
  SET_CURRENT_EXERCISE,
  SAVE_CURRENT_EXERCISE,
  CLEAR_CURRENT_EXERCISE,
  DELETE_SET
} from './types';

//SERVER ROUTE
// const USER_SERVER = '/api/users';

export const setExercise = (exerciseInfo) => {
  const { name, reps, weight, notes } = exerciseInfo;

  return {
    type: SET_CURRENT_EXERCISE,
    payload: {
      name,
      info: { reps, weight, notes }
    }
  };
};

export const saveExercise = (exerciseInfo) => {
  return {
    type: SAVE_CURRENT_EXERCISE,
    payload: exerciseInfo
  };
};

export const clearExercise = () => {
  return {
    type: CLEAR_CURRENT_EXERCISE
  };
};

export const deleteSet = (index) => {
  return {
    type: DELETE_SET,
    payload: index
  };
};
