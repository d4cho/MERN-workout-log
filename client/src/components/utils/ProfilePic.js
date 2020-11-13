import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

const ProfilePic = (props) => {
  const [error, setError] = useState(false);

  const defaultImage = require('../../assets/images/default_profile.jpg');

  useEffect(() => {
    setError(false);
  }, [props]);

  const imageErrorHandler = () => {
    setError(true);
  };

  // change host for production mode
  let host = 'http://localhost:5000/';
  if (process.env.NODE_ENV === 'production') {
    host = '/';
  }

  return (
    <div>
      <a href={`/myprofile/${props.userId}`}>
        {props.fromNavbar && props.isNewNotification && (
          <Badge
            color='primary'
            style={{ position: 'relative', top: '-24px', left: '64px' }}>
            New
          </Badge>
        )}
        <img
          style={{
            width: props.width,
            height: props.height,
            borderRadius: '50%'
          }}
          src={`${host}${
            error ? defaultImage : props.image ? props.image : defaultImage
          }`}
          alt={`productImg=${error ? defaultImage : props.image}`}
          onError={imageErrorHandler}
        />
      </a>
    </div>
  );
};

export default ProfilePic;
