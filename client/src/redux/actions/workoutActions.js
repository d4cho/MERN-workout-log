import axios from 'axios';
import {
  SET_CURRENT_EXERCISE,
  SAVE_CURRENT_EXERCISE,
  CLEAR_CURRENT_EXERCISE,
  DELETE_SET,
  SAVE_WORKOUT
} from './types';

// SERVER ROUTE
const WORKOUT_SERVER = '/api/workouts';

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

export const saveWorkout = (exercises) => {
  const request = axios
    .post(`${WORKOUT_SERVER}/postWorkout`, exercises)
    .then((response) => {
      // clearExercise();
      return response.data;
    });

  return {
    type: SAVE_WORKOUT,
    payload: request
  };
};
