import React, { useState, useEffect } from 'react';

const ProfilePic = (props) => {
  const [error, setError] = useState(false);

  const defaultImage = 'uploads/default_profile.jpg';

  useEffect(() => {
    setError(false);
  }, [props]);

  const imageErrorHandler = () => {
    setError(true);
  };

  return (
    <>
      <img
        style={{
          width: props.width,
          height: props.height,
          borderRadius: '50%'
        }}
        src={`http://localhost:5000/${error ? defaultImage : props.image}`}
        alt={`productImg=${error ? defaultImage : props.image}`}
        onError={imageErrorHandler}
      />
    </>
  );
};

export default ProfilePic;
