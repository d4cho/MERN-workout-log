import React, { useEffect } from 'react';
import { authUser } from '../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

export default function (Component, option) {
  function AuthCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      // send auth request to check current status
      dispatch(authUser()).then((response) => {
        // if not loggin in
        if (!response.payload.isAuth) {
          // if page requires login
          if (option) {
            props.history.push('/login');
          }
        } else {
          // already logged in, but try to go into log in page
          if (option === false) {
            props.history.push('/');
          }
        }
      });
    }, []);

    return <Component {...props} user={user} />;
  }
  return AuthCheck;
}
