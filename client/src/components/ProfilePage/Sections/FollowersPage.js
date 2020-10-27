import React, { useEffect } from 'react';

import UserList from './UserList';

const FollowersPage = (props) => {
  console.log(props.followersList);
  const renderFollowersList = props.followersList.map((follower) => (
    <UserList key={follower} userId={follower} />
  ));

  return <div>{renderFollowersList}</div>;
};

export default FollowersPage;
