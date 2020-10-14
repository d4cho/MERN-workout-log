import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useSelector } from 'react-redux';

import ProfilePic from '../../utils/ProfilePic';

const SubmitComment = (props) => {
  const user = useSelector((state) => state.user);
  const [showSubmit, setShowSubmit] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [comment, setComment] = useState('');

  const onTextareaClicked = () => {
    setShowSubmit(true);
  };

  const onCancelClicked = () => {
    setShowSubmit(false);
    setComment('');
  };

  const replyCancelClicked = () => {
    props.cancelClicked();
  };

  const onTextareaChange = (e) => {
    setComment(e.currentTarget.value);
  };

  return (
    <Form>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {props.reply ? null : (
          <>
            <div>number of comments</div>
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
              value={comment}
              onChange={onTextareaChange}
            />
          </div>
        </FormGroup>
        {!props.reply && showSubmit && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button outline color='secondary' onClick={onCancelClicked}>
              CANCEL
            </Button>
            {comment.length > 0 ? (
              <Button color='primary'>COMMENT</Button>
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
            {comment.length > 0 ? (
              <Button color='primary'>REPLY</Button>
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
