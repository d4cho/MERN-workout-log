import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'reactstrap';
import Moment from 'react-moment';
import axios from 'axios';

import ProfilePic from '../../utils/ProfilePic';
import Favorite from './Favorite';
import LikeDislike from './LikeDislike';
import SubmitComment from './SubmitComment';
import Comment from './Comment';

const PostInfo = (props) => {
  const [views, setViews] = useState(0);
  const [postId, setPostId] = useState('');
  const [userBy, setUserBy] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    console.log(props);
    setPostId(props.postId);
    setUserBy(props.postInfo.userId);
    if (props.postId) {
      const variables = {
        postId: props.postId,
        incViewByOne: 1
      };
      axios.post('/api/posts/increaseView', variables).then((response) => {
        if (response.data.success) {
          // console.log(response.data.post);
          setViews(response.data.post.views);
        } else {
          alert('failed to increase view count');
        }
      });
    }
  }, [props.postId]);

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
            <div>
              <LikeDislike userId={userId} postId={props.postId} />
            </div>
            <div>
              <Favorite userId={userId} postId={props.postId} userBy={userBy} />
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
          <h2 style={{ paddingLeft: '12px' }}>
            {props.postInfo.writer && props.postInfo.writer.username}
          </h2>
        </div>
        <br />
        <p>{props.postInfo.description}</p>
        <br />
        <hr className='my-2' />
        <br />
        <div>
          <SubmitComment />
        </div>
        <hr className='my-2' />
        <div>
          <Comment />
          <Comment />
        </div>
      </Jumbotron>
    </div>
  );
};

export default PostInfo;
