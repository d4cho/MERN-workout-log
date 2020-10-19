import React, { useState } from 'react';
import axios from 'axios';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useSelector } from 'react-redux';

import ProfilePic from '../../utils/ProfilePic';

const SubmitComment = (props) => {
  const user = useSelector((state) => state.user);
  const [showSubmit, setShowSubmit] = useState(false);
  const [commentToSubmit, setCommentToSubmit] = useState('');
  const userId = localStorage.getItem('userId');

  const onTextareaClicked = () => {
    setShowSubmit(true);
    console.log(props.commentId);
  };

  const onCancelClicked = () => {
    setShowSubmit(false);
    setCommentToSubmit('');
  };

  const replyCancelClicked = () => {
    props.cancelClicked();
  };

  const onTextareaChange = (e) => {
    setCommentToSubmit(e.currentTarget.value);
  };

  const onSubmit = () => {
    console.log('onSubmit Clicked', commentToSubmit);
    let variables = {
      postId: props.postId,
      writer: userId,
      content: commentToSubmit
    };
    if (props.reply) {
      variables = {
        replyToCommentId: props.commentId,
        writer: userId,
        content: commentToSubmit
      };
    }

    axios.post('/api/comments/createComment', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.comment);
        setShowSubmit(false);
        setCommentToSubmit('');
        if (props.reply) {
          props.replySubmitted();
        }
        props.refreshFunction();
      } else {
        alert('Failed to upload comment');
      }
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {props.reply ? null : (
          <>
            <h3>{props.numberOfComments} Comments</h3>
            <br />
          </>
        )}
        <FormGroup>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <ProfilePic
              width={'48px'}
              height={'48px'}
              image={user.userData.image}
            />
            <Input
              type='textarea'
              name='text'
              id='exampleText'
              placeholder={
                props.reply
                  ? 'Add a public reply...'
                  : 'Add a public comment...'
              }
              onClick={onTextareaClicked}
              value={commentToSubmit}
              onChange={onTextareaChange}
            />
          </div>
        </FormGroup>
        {!props.reply && showSubmit && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button outline color='secondary' onClick={onCancelClicked}>
              CANCEL
            </Button>
            {commentToSubmit.length > 0 ? (
              <Button color='primary' onClick={onSubmit}>
                COMMENT
              </Button>
            ) : (
              <Button disabled>COMMENT</Button>
            )}
          </div>
        )}
        {props.reply && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button outline color='secondary' onClick={replyCancelClicked}>
              CANCEL
            </Button>
            {commentToSubmit.length > 0 ? (
              <Button color='primary' onClick={onSubmit}>
                REPLY
              </Button>
            ) : (
              <Button disabled>REPLY</Button>
            )}
          </div>
        )}
      </div>
    </Form>
  );
};

export default SubmitComment;
