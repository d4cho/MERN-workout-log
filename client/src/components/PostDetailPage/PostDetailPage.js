import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from 'reactstrap';
import PostMedia from './Sections/PostMedia';
import PostInfo from './Sections/PostInfo';
import PulseLoader from 'react-spinners/PulseLoader';

const PostDetailPage = (props) => {
  const [postInfo, setPostInfo] = useState({});
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

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

  const deleteClickedToggle = () => {
    setShowDeleteOptions(!showDeleteOptions);
  };

  const noDeleteClicked = () => {
    setShowDeleteOptions(false);
  };

  const yesDeleteClicked = () => {
    let variables = {
      postId
    };
    axios.post('/api/posts/deletePost', variables).then((response) => {
      if (response.data.success) {
        alert('Post deleted');
        props.history.push('/posts');
      } else {
        alert('Failed to delete post');
      }
    });
  };

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
            {showDeleteOptions && (
              <div>
                <h2>Are you sure you want to delete this post?</h2>
                <br />
                <Button color='danger' size='lg' onClick={yesDeleteClicked}>
                  &nbsp;&nbsp;&nbsp;YES&nbsp;&nbsp;&nbsp;
                </Button>
                &nbsp;&nbsp;
                <Button color='secondary' size='lg' onClick={noDeleteClicked}>
                  &nbsp;&nbsp;&nbsp;NO&nbsp;&nbsp;&nbsp;
                </Button>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {showDeleteOptions ? (
                <Button color='secondary' onClick={deleteClickedToggle}>
                  CANCEL
                </Button>
              ) : (
                <Button color='danger' onClick={deleteClickedToggle}>
                  DELETE POST
                </Button>
              )}
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
