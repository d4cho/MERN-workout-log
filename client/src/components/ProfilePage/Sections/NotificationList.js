import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Badge } from 'reactstrap';

const notificationStyle = {
  padding: '24px',
  width: '70%',
  backgroundColor: '#F5F5F5',
  border: '1px solid blue',
  margin: '12px'
};

const NotificationList = (props) => {
  const [notificationType, setNotificationType] = useState('');
  const [notificationFrom, setNotificationFrom] = useState('');
  const [seenByUser, setSeenByUser] = useState(false);

  useEffect(() => {
    let variables = {
      notificationId: props.notificationId
    };

    axios
      .post('/api/notifications/getNotifications', variables)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.notification);
        } else {
          alert('failed to get notification');
        }
      });
  }, []);

  const checkNotificationType = () => {};

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
      <div style={notificationStyle}>
        <h2>
          <Badge color='primary'>New</Badge>&nbsp;&nbsp;&nbsp;User liked your
          post!
        </h2>
      </div>
      <div style={notificationStyle}>
        <h2>
          <Badge color='primary'>New</Badge>&nbsp;&nbsp;&nbsp;User commented on
          your post!
        </h2>
      </div>
      <div style={notificationStyle}>
        <h2>
          <Badge color='primary'>New</Badge>&nbsp;&nbsp;&nbsp;User started
          following you!
        </h2>
      </div>
      <div style={notificationStyle}>
        <h2>
          <Badge color='primary'>New</Badge>&nbsp;&nbsp;&nbsp;User created a new
          post!
        </h2>
      </div>
    </div>
  );
};

export default NotificationList;
