import React from 'react';

import { Button } from 'reactstrap';

import NotificationList from './NotificationList';

const NotificationsPage = (props) => {
  const notification = props.notificationsList.map((notification) => (
    <NotificationList
      key={notification._id}
      notification={notification}
      refreshFunction={props.refreshFunction}
    />
  ));

  return notification;
};

export default NotificationsPage;
