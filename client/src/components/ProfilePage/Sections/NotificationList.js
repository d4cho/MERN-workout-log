import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Badge, Button, Tooltip } from 'reactstrap';

import ProfilePic from '../../utils/ProfilePic';

const notificationParentStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
};

const notificationStyle = {
  display: 'flex',
  alignItems: 'center',
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

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const variables = {
    notificationId: props.notification._id
  };

  useEffect(() => {
    setNotificationURL(props.notification._id);
    setNotificationType(checkNotificationType(props.notification));
    setNotificationFrom(props.notification.notificationFromUserId.username);
    setSeenByUser(props.notification.seenByUser);
  }, []);

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

  const removeNotification = () => {
    axios
      .post('/api/notifications/removeNotification', variables)
      .then((response) => {
        if (response.data.success) {
          props.refreshFunction();
        } else {
          alert('Failed to remove notification');
        }
      });
  };

  const renderNotification = () => {
    switch (notificationType) {
      case 'newLike':
        return (
          <div style={notificationParentStyle}>
            <h2 style={notificationStyle}>
              {seenByUser ? null : <Badge color='primary'>New</Badge>}
              &nbsp;&nbsp;&nbsp;
              <ProfilePic
                width={'48px'}
                height={'48px'}
                image={props.notification.notificationFromUserId.image}
                userId={props.notification.notificationFromUserId._id}
              />
              <a
                href={`/posts/${notificationURL}`}
                onClick={notificationClickedHandler}>
                {`${notificationFrom} liked your post!`}
              </a>
            </h2>
            <Button
              color='danger'
              id='removeTooltip'
              onClick={removeNotification}>
              <Tooltip
                placement='right'
                isOpen={tooltipOpen}
                target='removeTooltip'
                toggle={toggle}>
                Remove notification
              </Tooltip>
              &#10005;
            </Button>
          </div>
        );

      case 'newPost':
        return (
          <div style={notificationParentStyle}>
            <h2 style={notificationStyle}>
              {seenByUser ? null : <Badge color='primary'>New</Badge>}
              &nbsp;&nbsp;&nbsp;
              <ProfilePic
                width={'48px'}
                height={'48px'}
                image={props.notification.notificationFromUserId.image}
                userId={props.notification.notificationFromUserId._id}
              />
              <a
                href={`/posts/${notificationURL}`}
                onClick={notificationClickedHandler}>
                {`${notificationFrom} created a new post, <${props.notification.postId.title}>.`}
              </a>
            </h2>
            <Button
              color='danger'
              id='removeTooltip'
              onClick={removeNotification}>
              <Tooltip
                placement='right'
                isOpen={tooltipOpen}
                target='removeTooltip'
                toggle={toggle}>
                Remove notification
              </Tooltip>
              &#10005;
            </Button>
          </div>
        );

      case 'newComment':
        return (
          <div style={notificationParentStyle}>
            <h2 style={notificationStyle}>
              {seenByUser ? null : <Badge color='primary'>New</Badge>}
              &nbsp;&nbsp;&nbsp;
              <ProfilePic
                width={'48px'}
                height={'48px'}
                image={props.notification.notificationFromUserId.image}
                userId={props.notification.notificationFromUserId._id}
              />
              <a
                href={`/posts/${notificationURL}`}
                onClick={notificationClickedHandler}>
                {`${notificationFrom} commented: "${props.notification.commentContent}" on your post, <${props.notification.commentId.title}>.`}
              </a>
            </h2>
            <Button
              color='danger'
              id='removeTooltip'
              onClick={removeNotification}>
              <Tooltip
                placement='right'
                isOpen={tooltipOpen}
                target='removeTooltip'
                toggle={toggle}>
                Remove notification
              </Tooltip>
              &#10005;
            </Button>
          </div>
        );

      case 'newFollower':
        return (
          <div style={notificationParentStyle}>
            <h2 style={notificationStyle}>
              {seenByUser ? null : <Badge color='primary'>New</Badge>}
              &nbsp;&nbsp;&nbsp;
              <ProfilePic
                width={'48px'}
                height={'48px'}
                image={props.notification.notificationFromUserId.image}
                userId={props.notification.notificationFromUserId._id}
              />
              <a
                href={`/myprofile/${notificationURL}`}
                onClick={notificationClickedHandler}>
                {`${notificationFrom} started following you!`}
              </a>
            </h2>
            <Button
              color='danger'
              id='removeTooltip'
              onClick={removeNotification}>
              <Tooltip
                placement='right'
                isOpen={tooltipOpen}
                target='removeTooltip'
                toggle={toggle}>
                Remove notification
              </Tooltip>
              &#10005;
            </Button>
          </div>
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
