import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import axios from 'axios';

import { Button } from 'reactstrap';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';

import ProfilePic from '../../utils/ProfilePic';
import LikeDislike from './LikeDislike';
import SubmitComment from './SubmitComment';

const Comment = (props) => {
  const [showReplySubmit, setShowReplySubmit] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);

  const userId = localStorage.getItem('userId');

  const variables = {
    replyToCommentId: props.commentId
  };

  useEffect(() => {
    getReplies();
  }, []);

  const onReplyClicked = () => {
    setShowReplySubmit(true);
  };

  const cancelClicked = () => {
    setShowReplySubmit(false);
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const onReplySubmitted = () => {
    setShowReplySubmit(false);
  };

  const getReplies = () => {
    axios.post('/api/comments/getComments', variables).then((response) => {
      if (response.data.success) {
        setReplies(response.data.comments);
      } else {
        alert('failed to get replies');
      }
    });
  };

  const renderReplies = replies.map((reply) => (
    <Comment
      key={reply._id}
      content={reply.content}
      createdAt={reply.createdAt}
      username={reply.writer.username}
      userImage={reply.writer.image}
      commentId={reply._id}
    />
  ));

  return (
    <div style={{ display: 'flex', padding: '24px 0' }}>
      <ProfilePic image={props.userImage} width={'48px'} height={'48px'} />
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ fontWeight: 'bold', paddingRight: '12px' }}>
            {props.username}
          </div>
          <Moment fromNow>{props.createdAt}</Moment>
        </div>
        <div style={{ padding: '12px 0', fontSize: '1.3em' }}>
          {props.content}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ paddingRight: '12px' }}>
            <LikeDislike
              useId={userId}
              commentId={props.commentId}
              fromComment
            />
          </div>
          <Button outline color='secondary' onClick={onReplyClicked}>
            REPLY
          </Button>
        </div>
        {showReplySubmit && (
          <SubmitComment
            reply
            cancelClicked={cancelClicked}
            commentId={props.commentId}
            refreshFunction={getReplies}
            replySubmitted={onReplySubmitted}
          />
        )}
        <div>
          {replies.length === 1 ? (
            <Button color='link' onClick={toggleReplies}>
              {showReplies ? (
                <>
                  <BsFillCaretUpFill /> Hide reply
                </>
              ) : (
                <>
                  <BsFillCaretDownFill /> View reply
                </>
              )}
            </Button>
          ) : replies.length > 0 && replies.length !== 1 ? (
            <Button color='link' onClick={toggleReplies}>
              {showReplies ? (
                <>
                  <BsFillCaretUpFill /> Hide {replies.length} replies
                </>
              ) : (
                <>
                  <BsFillCaretDownFill /> View {replies.length} replies
                </>
              )}
            </Button>
          ) : null}
        </div>
        {showReplies && renderReplies}
      </div>
    </div>
  );
};

export default Comment;
