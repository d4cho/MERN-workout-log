import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PulseLoader from 'react-spinners/PulseLoader';
import ProfilePic from '../../utils/ProfilePic';

const UserList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState({});

  useEffect(() => {
    console.log(props.userId);
    if (props.userId) {
      console.log('in here');
      let variables = {
        userId: props.userId
      };

      axios
        .post('/api/users/getUserProfileInfo', variables)
        .then((response) => {
          if (response.data.success) {
            setUserProfileInfo(response.data.user);
            setIsLoading(false);
          } else {
            alert('Failed to get user profile info');
          }
        });
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '48px',
        width: '70%',
        backgroundColor: '#F5F5F5',
        margin: 'auto'
      }}>
      {isLoading ? (
        <PulseLoader size={25} color={'#0000FF'} />
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ProfilePic
              width='240px'
              height='240px'
              image={userProfileInfo.image}
            />
            <div>
              <div>{userProfileInfo.username}</div>
              <div>
                {userProfileInfo.followers
                  ? userProfileInfo.followers.length
                  : '0'}{' '}
                followers
              </div>
            </div>
          </div>
          <div>
            <button>follow</button>
            <button>remove</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
