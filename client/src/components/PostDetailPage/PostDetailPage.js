import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from 'reactstrap';
import PostMedia from './Sections/PostMedia';
import PostInfo from './Sections/PostInfo';
import PulseLoader from 'react-spinners/PulseLoader';

const PostDetailPage = (props) => {
  const [postInfo, setPostInfo] = useState({});

  const postId = props.match.params.postId;
  const userId = localStorage.getItem('userId');

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

  if (postInfo && postInfo.writer) {
    return (
      <div
        style={{
          marginLeft: '15%',
          marginRight: '15%',
          marginTop: '48px',
          marginBottom: '48px'
        }}>
        <PostMedia images={postInfo.images} video={postInfo.videoFilePath} />
        <PostInfo postInfo={postInfo} postId={postId} />
        {userId === postInfo.userId && (
          <>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button color='danger'>DELETE POST</Button>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return <PulseLoader size={25} color={'#0000FF'} />;
  }
};

export default PostDetailPage;
