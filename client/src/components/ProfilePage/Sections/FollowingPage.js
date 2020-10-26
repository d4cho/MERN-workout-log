import React from 'react';

import UserList from './UserList';

const FollowingPage = (props) => {
  return <UserList followingList={props.followingList} />;
};

export default FollowingPage;
