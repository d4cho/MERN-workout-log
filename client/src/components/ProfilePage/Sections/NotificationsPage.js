import React from 'react';

import NotificationList from './NotificationList';

const NotificationsPage = (props) => {
  const notification = props.notificationsList.map((notification) => (
    <NotificationList key={notification._id} notification={notification} />
  ));

  return notification;
};

export default NotificationsPage;
