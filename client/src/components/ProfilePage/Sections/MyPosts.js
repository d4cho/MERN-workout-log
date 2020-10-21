import React from 'react';

import PostsPage from '../../PostsPage/PostsPage';

const MyPosts = (props) => {
  return (
    <div>
      <PostsPage
        fromMyProfile={true}
        profilePageUserId={props.profilePageUserId}
      />
    </div>
  );
};

export default MyPosts;
