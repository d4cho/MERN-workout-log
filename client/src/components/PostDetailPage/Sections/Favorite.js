import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

const Favorite = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const variables = {
    userId: props.userId,
    postId: props.postId,
    userBy: props.userBy
  };

  useEffect(() => {
    if (variables.userId && variables.postId && variables.userBy) {
      axios
        .get(
          `/api/favorites/favorites/check?postId=${props.postId}&userId=${props.userId}`
        )
        .then((response) => {
          if (response.data.success) {
            setIsFavorite(response.data.favorited);
          } else {
            alert('Failed to get favorited info');
          }
        });
    }
  }, [variables]);

  const toggleIsFavorite = () => {
    if (isFavorite) {
      axios
        .delete(
          `/api/favorites/favorites?postId=${props.postId}&userId=${props.userId}`
        )
        .then((response) => {
          if (response.data.success) {
            setIsFavorite(false);
          } else {
            alert('Failed to remove from favorites');
          }
        });
    } else {
      axios.post('/api/favorites/favorites', variables).then((response) => {
        if (response.data.success) {
          setIsFavorite(true);
        } else {
          alert('failed to add to favorites');
        }
      });
    }
  };

  return (
    <div>
      <Button
        onClick={toggleIsFavorite}
        disabled={props.userId ? false : true}
        color={
          !props.userId ? 'secondary' : isFavorite ? 'warning' : 'primary'
        }>
        {!props.userId
          ? 'Login to add to Favorites'
          : isFavorite
          ? 'Favorited'
          : 'Add to Favorites'}
      </Button>
    </div>
  );
};

export default Favorite;
