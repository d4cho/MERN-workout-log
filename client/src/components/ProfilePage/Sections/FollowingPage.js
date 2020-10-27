import React from 'react';

import UserList from './UserList';

const FollowingPage = (props) => {
  const renderFollowingList = props.followingList.map((user) => (
    <UserList
      key={user}
      userId={user}
      refreshFunction={props.refreshFunction}
    />
  ));

  return <div>{renderFollowingList}</div>;
};

export default FollowingPage;
