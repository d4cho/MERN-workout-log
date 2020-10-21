import axios from 'axios';
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  SET_USER_STATS,
  GET_USER_STATS
} from './types';

//SERVER ROUTE
const USER_SERVER = '/api/users';

export const registerUser = (userInfo) => {
  const request = axios
    .post(`${USER_SERVER}/register`, userInfo)
    .then((response) => {
      console.log(response.data.user);
      return response.data;
    });

  console.log(request);

  return {
    type: REGISTER_USER,
    payload: request
  };
};

export const loginUser = (userInfo) => {
  const request = axios
    .post(`${USER_SERVER}/login`, userInfo)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem('userId', response.data.userId);
      return response.data;
    });

  return {
    type: LOGIN_USER,
    payload: request
  };
};

export const logoutUser = () => {
  const request = axios.get(`${USER_SERVER}/logout`).then((response) => {
    document.cookie = 'x_auth=';
    document.cookie = 'x_auth_exp=';
    return response.data;
  });
  return {
    type: LOGOUT_USER,
    payload: request
  };
};

export const authUser = () => {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
};

export const setUserStats = (userInfo) => {
  const request = axios
    .post(`${USER_SERVER}/setStats`, userInfo)
    .then((response) => response.data);

  return {
    type: SET_USER_STATS,
    payload: request
  };
};

export const getUserStats = (userId) => {
  const request = axios
    .get(`${USER_SERVER}/getStats?userId=${userId}`)
    .then((response) => response.data);

  return {
    type: GET_USER_STATS,
    payload: request
  };
};
