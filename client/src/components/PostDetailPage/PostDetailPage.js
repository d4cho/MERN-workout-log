import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostMedia from './Sections/PostMedia';
import PostInfo from './Sections/PostInfo';

const PostDetailPage = (props) => {
  const [postInfo, setPostInfo] = useState({});

  const postId = props.match.params.postId;

  useEffect(() => {
    axios.get(`/api/posts/post_by_postId?postId=${postId}`).then((response) => {
      if (response.data.success) {
        console.log(response.data.post[0]);
        setPostInfo(response.data.post[0]);
      } else {
        alert('failed to get post from server');
      }
    });
  }, []);

  return (
    <div style={{ marginLeft: '15%', marginRight: '15%', marginTop: '48px' }}>
      <PostMedia images={postInfo.images} video={postInfo.videoFilePath} />
      <div>
        <PostInfo postInfo={postInfo} />
      </div>
    </div>
  );
};

export default PostDetailPage;
