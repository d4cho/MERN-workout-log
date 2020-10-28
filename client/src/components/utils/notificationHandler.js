import axios from 'axios';

export default function (
  typeOfNotification,
  typeOfNotificationId,
  notificationFromUserId,
  notificationToUserId
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
        commentId: typeOfNotificationId
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

  console.log(variables);

  axios
    .post('/api/notifications/createNotification', variables)
    .then((response) => {
      if (response.data.success) {
        console.log(response.data.notification);
      } else {
        alert('Failed to save notification');
      }
    });
}
