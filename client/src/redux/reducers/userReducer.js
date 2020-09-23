import {
  AUTH_USER,
  GET_USER_STATS,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  SET_USER_STATS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registerSuccess: action.payload
      };

    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload
      };

    case LOGOUT_USER:
      return {
        logoutSuccess: action.payload
      };

    case AUTH_USER:
      return {
        ...state,
        userData: action.payload
      };

    case SET_USER_STATS:
      return {
        ...state,
        userData: {
          ...state.userData,
          weight: action.payload.stats.weight,
          squat: action.payload.stats.squat,
          bench: action.payload.stats.bench,
          deadlift: action.payload.stats.deadlift
        },
        setStatsSuccess: action.payload.success
      };

    case GET_USER_STATS:
      return {
        userData: action.payload.user
      };

    default:
      return state;
  }
};
