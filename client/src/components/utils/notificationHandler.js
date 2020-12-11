import axios from 'axios';

export default function (
  typeOfNotification,
  typeOfNotificationId,
  notificationFromUserId,
  notificationToUserId,
  commentContent
) {
  let variables = {};

  switch (typeOfNotification) {
    case 'post':
      variables = {
        notificationFromUserId,
        notificationToUserId,
        postId: typeOfNotificationId
      };
      break;

    case 'comment':
      variables = {
        notificationFromUserId,
        notificationToUserId,
        commentId: typeOfNotificationId,
        commentContent
      };
      break;

    case 'like':
      variables = {
        notificationFromUserId,
        notificationToUserId,
        likeId: typeOfNotificationId
      };
      break;

    case 'dislike':
      variables = {
        notificationFromUserId,
        notificationToUserId,
        dislikeId: typeOfNotificationId
      };
      break;

    case 'follow':
      variables = {
        notificationFromUserId,
        notificationToUserId,
        followedByUserId: notificationFromUserId
      };
      break;

    default:
      variables = {};
  }

  axios.post('/api/notifications/notification', variables).then((response) => {
    if (response.data.success) {
      // alert('Notification saved');
    } else {
      alert('Failed to save notification');
    }
  });
}
