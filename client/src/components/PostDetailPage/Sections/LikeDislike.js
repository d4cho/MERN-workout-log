import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip } from 'reactstrap';
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike
} from 'react-icons/ai';
import notificationHandler from '../../utils/notificationHandler';

const LikeDislike = (props) => {
  // state and functions for tooltip
  const [likeTooltipOpen, setLikeTooltipOpen] = useState(false);
  const [dislikeTooltipOpen, setDislikeTooltipOpen] = useState(false);

  const toggleLike = () => setLikeTooltipOpen(!likeTooltipOpen);
  const toggleDislike = () => setDislikeTooltipOpen(!dislikeTooltipOpen);

  //state and functions for like and dislike functionality
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  let variables = {};
  if (props.postId) {
    variables = {
      postId: props.postId,
      userId: props.userId
    };
  } else {
    variables = {
      commentId: props.commentId,
      userId: props.userId
    };
  }

  useEffect(() => {
    console.log(props);

    axios.post('/api/likes/getLikes', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.likes);
        // set the number of likes the post already has
        setLikes(response.data.likes.length);

        // check if user already liked the post
        response.data.likes.forEach((like) => {
          if (like.userId === props.userId) {
            setLikeAction('liked');
          }
        });
      } else {
        alert('Failed to get number of likes');
      }
    });

    axios.post('/api/likes/getDislikes', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.dislikes);
        // set the number of dislikes the post already has
        setDislikes(response.data.dislikes.length);

        // check if user already disliked the post
        response.data.dislikes.forEach((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction('disliked');
          }
        });
      } else {
        alert('Failed to get number of dislikes');
      }
    });
  }, []);

  const likeClicked = () => {
    console.log('like clicked');
    if (likeAction === null) {
      // like button was not clicked yet
      axios.post('/api/likes/uplike', variables).then((response) => {
        if (response.data.success) {
          console.log('likeInfo', response.data.likeInfo);
          setLikes(likes + 1);
          setLikeAction('liked');

          notificationHandler(
            'like',
            response.data.likeInfo[0].postId._id,
            props.userId,
            response.data.likeInfo[0].postId.writer
          );

          // if dislike button was already clicked
          if (dislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(dislikes - 1);
          }
        } else {
          console.log('Failed to like post');
        }
      });
    } else {
      //like button was already clicked
      axios.post('/api/likes/downlike', variables).then((response) => {
        if (response.data.success) {
          setLikes(likes - 1);
          setLikeAction(null);
        } else {
          console.log('Failed to unlike post');
        }
      });
    }
  };

  const dislikeClicked = () => {
    console.log('dislike clicked');
    if (dislikeAction === null) {
      axios.post('/api/likes/updislike', variables).then((response) => {
        if (response.data.success) {
          setDislikes(dislikes + 1);
          setDislikeAction('disliked');

          if (likeAction !== null) {
            setLikeAction(null);
            setLikes(likes - 1);
          }
        } else {
          alert('Failed to dislike post');
        }
      });
    } else {
      axios.post('/api/likes/downdislike', variables).then((response) => {
        if (response.data.success) {
          setDislikes(dislikes - 1);
          setDislikeAction(null);
        } else {
          alert('Failed to undo dislike');
        }
      });
    }
  };

  if (props.commentId) {
    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{ padding: '0 12px', cursor: 'pointer' }}
          onClick={likeClicked}>
          {likeAction === null ? <AiOutlineLike /> : <AiFillLike />}
          {likes}
        </div>
        <div
          style={{ padding: '0 12px', cursor: 'pointer' }}
          onClick={dislikeClicked}>
          {dislikeAction === null ? <AiOutlineDislike /> : <AiFillDislike />}
          {dislikes}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{ padding: '0 12px', cursor: 'pointer' }}
        id='LikeTooltip'
        onClick={likeClicked}>
        {likeAction === null ? <AiOutlineLike /> : <AiFillLike />}
        {likes}
        <Tooltip
          placement='bottom'
          isOpen={likeTooltipOpen}
          target='LikeTooltip'
          toggle={toggleLike}>
          {likeAction === null ? 'I like this' : 'Unlike'}
        </Tooltip>
      </div>
      <div
        style={{ padding: '0 12px', cursor: 'pointer' }}
        id='DislikeTooltip'
        onClick={dislikeClicked}>
        {dislikeAction === null ? <AiOutlineDislike /> : <AiFillDislike />}

        {dislikes}
        <Tooltip
          placement='bottom'
          isOpen={dislikeTooltipOpen}
          target='DislikeTooltip'
          toggle={toggleDislike}>
          {dislikeAction === null ? 'I dislike this' : 'Undo dislike'}
        </Tooltip>
      </div>
    </div>
  );
};

export default LikeDislike;
