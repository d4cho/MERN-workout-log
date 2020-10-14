import React, { useState } from 'react';

import ProfilePic from '../../utils/ProfilePic';
import LikeDislike from './LikeDislike';
import SubmitComment from './SubmitComment';

const Comment = (props) => {
  const [showReply, setShowReply] = useState(false);

  const onReplyClicked = () => {
    setShowReply(true);
  };

  const cancelClicked = () => {
    setShowReply(false);
  };

  return (
    <div style={{ display: 'flex', padding: '24px 0' }}>
      <div>
        <ProfilePic width={'48px'} height={'48px'} />
      </div>
      <div>
        <div style={{ display: 'flex' }}>
          <div>Username</div>
          <div>X days ago</div>
        </div>
        <div>Actual Comment Text</div>
        <div style={{ display: 'flex' }}>
          <div>{/* <LikeDislike /> */}</div>
          <button onClick={onReplyClicked}>REPLY</button>
        </div>
        {showReply && <SubmitComment reply cancelClicked={cancelClicked} />}
        <div>
          <button>View X replies</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
