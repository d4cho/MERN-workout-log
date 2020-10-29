import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Badge } from 'reactstrap';

const notificationStyle = {
  padding: '24px',
  width: '70%',
  backgroundColor: '#F5F5F5',
  border: '1px solid blue',
  margin: '12px',
  textDecoration: 'none'
};

const NotificationList = (props) => {
  const [notificationURL, setNotificationURL] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [notificationFrom, setNotificationFrom] = useState('');
  const [seenByUser, setSeenByUser] = useState(false);

  const variables = {
    notificationId: props.notificationId
  };

  useEffect(() => {
    axios
      .post('/api/notifications/getNotifications', variables)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.notification);

          setNotificationFrom(
            response.data.notification.notificationFromUserId.username
          );
          setSeenByUser(response.data.notification.seenByUser);

          // check what type of notification
          setNotificationType(
            checkNotificationType(response.data.notification)
          );
        } else {
          alert('failed to get notification');
        }
      });
  }, []);

  console.log(notificationFrom, notificationType, seenByUser);

  const checkNotificationType = (notificationInfo) => {
    if (Object.keys(notificationInfo).includes('likeId')) {
      setNotificationURL(notificationInfo.likeId);
      return 'newLike';
    } else if (Object.keys(notificationInfo).includes('postId')) {
      setNotificationURL(notificationInfo.postId);
      return 'newPost';
    } else if (Object.keys(notificationInfo).includes('commentId')) {
      setNotificationURL(notificationInfo.commentId);
      return 'newComment';
    } else if (Object.keys(notificationInfo).includes('followedByUserId')) {
      setNotificationURL(notificationInfo.followedByUserId);
      return 'newFollower';
    }
  };

  const notificationClickedHandler = () => {
    console.log('notification clicked');

    axios
      .post('/api/notifications/updateNotificationSeen', variables)
      .then((response) => {
        if (response.data.success) {
          setSeenByUser(true);
        } else {
          alert('Failed to check notification');
        }
      });
  };

  const renderNotification = () => {
    switch (notificationType) {
      case 'newLike':
        return (
          <a
            href={`/posts/${notificationURL}`}
            style={notificationStyle}
            onClick={notificationClickedHandler}>
            <h2>
              {seenByUser ? null : <Badge color='primary'>New</Badge>}
              &nbsp;&nbsp;&nbsp;{notificationFrom} liked your post!
            </h2>
          </a>
        );

      case 'newPost':
        return (
          <div style={notificationStyle}>
            <h2>
              {seenByUser ? null : <Badge color='primary'>New</Badge>}
              &nbsp;&nbsp;&nbsp;{notificationFrom} created a new post!
            </h2>
          </div>
        );

      case 'newComment':
        return (
          <a
            href={`/posts/${notificationURL}`}
            style={notificationStyle}
            onClick={notificationClickedHandler}>
            <h2>
              {seenByUser ? null : <Badge color='primary'>New</Badge>}
              &nbsp;&nbsp;&nbsp;{notificationFrom} commented on your post!
            </h2>
          </a>
        );

      case 'newFollower':
        return (
          <a
            href={`/myprofile/${notificationURL}`}
            style={notificationStyle}
            onClick={notificationClickedHandler}>
            <h2>
              {seenByUser ? null : <Badge color='primary'>New</Badge>}
              &nbsp;&nbsp;&nbsp;{notificationFrom} started following you!
            </h2>
          </a>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '48px'
      }}>
      {renderNotification()}
    </div>
  );
};

export default NotificationList;
