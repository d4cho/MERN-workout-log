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
        .post('/api/favorites/checkIfFavorite', variables)
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
        .post('/api/favorites/removeFromFavorites', variables)
        .then((response) => {
          if (response.data.success) {
            setIsFavorite(false);
          } else {
            alert('failed to remove from favorites');
          }
        });
    } else {
      axios
        .post('/api/favorites/addToFavorites', variables)
        .then((response) => {
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
        color={isFavorite ? 'warning' : 'primary'}>
        {isFavorite ? 'Favorited' : 'Add to Favorites'}
      </Button>
    </div>
  );
};

export default Favorite;
