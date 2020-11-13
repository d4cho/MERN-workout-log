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
  const [userBy, setUserBy] = useState('');
  const [comments, setComments] = useState([]);

  const userId = localStorage.getItem('userId');

  let variables = {
    postId: props.postId
  };

  useEffect(() => {
    setUserBy(props.postInfo.userId);
    if (props.postId) {
      variables = {
        postId: props.postId,
        incViewByOne: 1
      };
      axios.post('/api/posts/increaseView', variables).then((response) => {
        if (response.data.success) {
          setViews(response.data.post.views);
        } else {
          alert('failed to increase view count');
        }
      });

      getComments();
    }
  }, [props.postId]);

  const getComments = () => {
    axios.post('/api/comments/getComments', variables).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert('Failed to get comments');
      }
    });
  };

  const renderComments = () =>
    comments.map((comment) => (
      <Comment
        key={comment._id}
        content={comment.content}
        createdAt={comment.createdAt}
        username={comment.writer.username}
        userImage={comment.writer.image}
        commentId={comment._id}
      />
    ));

  return (
    <div>
      <Jumbotron>
        <h1>{props.postInfo.title}</h1>
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
              userId={props.postInfo.writer._id}
            />
          </div>
          <h2 style={{ paddingLeft: '12px' }}>
            {props.postInfo.writer && props.postInfo.writer.username}
          </h2>
        </div>
        <br />
        <p style={{ fontSize: '1.5em' }}>{props.postInfo.description}</p>
        <br />
        <hr className='my-2' />
        <br />
        <div>
          <SubmitComment
            postId={props.postId}
            refreshFunction={getComments}
            numberOfComments={comments.length}
          />
        </div>
        <hr className='my-2' />
        <div>{renderComments()}</div>
      </Jumbotron>
    </div>
  );
};

export default PostInfo;
