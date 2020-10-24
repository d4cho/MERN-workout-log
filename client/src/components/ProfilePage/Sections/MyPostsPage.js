import React from 'react';

import PostsPage from '../../PostsPage/PostsPage';

const MyPostsPage = (props) => {
  return (
    <div>
      <PostsPage
        fromMyProfile={true}
        profilePageUserId={props.profilePageUserId}
      />
    </div>
  );
};

export default MyPostsPage;
