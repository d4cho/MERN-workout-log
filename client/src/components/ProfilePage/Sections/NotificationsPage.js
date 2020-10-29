import React from 'react';

import NotificationList from './NotificationList';

const NotificationsPage = (props) => {
  const notification = props.notificationsList.map((notificationId) => (
    <NotificationList key={notificationId} notificationId={notificationId} />
  ));

  return notification;
};

export default NotificationsPage;
