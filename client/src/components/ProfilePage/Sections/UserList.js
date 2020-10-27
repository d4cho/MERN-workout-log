import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from 'reactstrap';
import PulseLoader from 'react-spinners/PulseLoader';
import ProfilePic from '../../utils/ProfilePic';

const UserList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [isfollowBack, setIsFollowBack] = useState(false);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);

  const userId = localStorage.getItem('userId');

  if (userProfileInfo.followers && userProfileInfo.followers.includes(userId)) {
    setIsFollowBack(true);
  }

  useEffect(() => {
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
            setNumberOfFollowers(response.data.user.followers.length);
            setIsLoading(false);
            console.log(response.data.user);
          } else {
            alert('Failed to get user profile info');
          }
        });
    }
  }, []);

  const onFollowClicked = () => {
    let variables = {
      profileOwnerUserId: userProfileInfo._id,
      followersList: userProfileInfo.followers.concat(userId)
    };

    console.log(variables);

    axios.post('/api/users/follow', variables).then((response) => {
      if (response.data.success) {
        setIsFollowBack(true);
        setNumberOfFollowers(numberOfFollowers + 1);
        console.log(response.data.profileUser);
      } else {
        alert('Failed to follow user');
      }
    });
  };

  const onUnfollowClicked = () => {};

  const onRemoveClicked = () => {};

  console.log(userProfileInfo);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '48px',
        width: '70%',
        backgroundColor: '#F5F5F5',
        margin: 'auto',
        marginTop: '48px'
      }}>
      {isLoading ? (
        <PulseLoader size={25} color={'#0000FF'} />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <ProfilePic
              width='120px'
              height='120px'
              image={userProfileInfo.image}
            />
            <div style={{ paddingLeft: '24px' }}>
              <h2>{userProfileInfo.username}</h2>
              <h4 style={{ color: '#808080' }}>
                {numberOfFollowers}&nbsp;followers
              </h4>
            </div>
          </div>
          <div>
            {isfollowBack ? (
              <Button color='secondary' size='lg'>
                Unfollow
              </Button>
            ) : (
              <Button color='primary' size='lg' onClick={onFollowClicked}>
                Follow
              </Button>
            )}

            <Button color='danger' size='lg'>
              Remove
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
