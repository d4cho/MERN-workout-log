import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'reactstrap';
import Moment from 'react-moment';
import axios from 'axios';

import ProfilePic from '../../utils/ProfilePic';

import Favorite from './Favorite';

const PostInfo = (props) => {
  const [views, setViews] = useState(0);
  const [postId, setPostId] = useState('');
  const [userBy, setUserBy] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    console.log(props.postInfo);
    setPostId(props.postInfo._id);
    setUserBy(props.postInfo.userId);
    if (props.postInfo._id) {
      const variables = {
        postId: props.postInfo._id,
        incViewByOne: 1
      };
      axios.post('/api/posts/increaseView', variables).then((response) => {
        if (response.data.success) {
          console.log(response.data.post);
          setViews(response.data.post.views);
        } else {
          alert('failed to increase view count');
        }
      });
    }
  }, [props.postInfo._id]);

  return (
    <div>
      <Jumbotron>
        <h1 className='display-3'>{props.postInfo.title}</h1>
        <br />
        <div className='lead'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{views} views</div>
            <div>
              <Moment format='MMM DD, YYYY'>{props.postInfo.createdAt}</Moment>
            </div>
            <div>Likes and Dislikes</div>
            <div>
              <Favorite userId={userId} postId={postId} userBy={userBy} />
            </div>
          </div>
        </div>
        <hr className='my-2' />
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <ProfilePic
              image={props.postInfo.writer && props.postInfo.writer.image}
              width={'64px'}
              height={'64px'}
            />
          </div>
          <h2 style={{ paddingLeft: '24px' }}>
            {props.postInfo.writer && props.postInfo.writer.username}
          </h2>
        </div>
        <br />
        <p>{props.postInfo.description}</p>
        <br />
        <hr className='my-2' />
        <br />
        <div>Comments</div>
      </Jumbotron>
    </div>
  );
};

export default PostInfo;
