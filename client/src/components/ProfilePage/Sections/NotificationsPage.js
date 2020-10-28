import React from 'react';
import { Badge } from 'reactstrap';

const notificationStyle = {
  padding: '24px',
  width: '70%',
  backgroundColor: '#F5F5F5',
  border: '1px solid blue',
  margin: '12px'
};

const NotificationsPage = () => {
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

export default NotificationsPage;
