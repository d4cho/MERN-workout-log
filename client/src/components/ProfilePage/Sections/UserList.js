import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from 'reactstrap';
import PulseLoader from 'react-spinners/PulseLoader';
import ProfilePic from '../../utils/ProfilePic';

const FOLLOW_BUTTON = 'FOLLOW_BUTTON';
const UNFOLLOW_BUTTON = 'UNFOLLOW_BUTTON';
const DISABLE_BUTTON = 'DISABLE_BUTTON';

const UserList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);
  const [buttonState, setButtonState] = useState(DISABLE_BUTTON);

  const userId = localStorage.getItem('userId');

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
            console.log(response.data.user);
            buttonStateCheck(response.data.user);
            setIsLoading(false);
          } else {
            alert('Failed to get user profile info');
          }
        });
    }
  }, []);

  const buttonStateCheck = (userProfile) => {
    if (userProfile.followers && userProfile.followers.includes(userId)) {
      setButtonState(UNFOLLOW_BUTTON);
    } else {
      setButtonState(FOLLOW_BUTTON);
    }
  };

  const onFollowClicked = () => {
    setIsLoading(true);
    let variables = {
      profileOwnerUserId: userProfileInfo._id,
      followersList: userProfileInfo.followers.concat(userId)
    };

    console.log(variables);

    axios.post('/api/users/follow', variables).then((response) => {
      if (response.data.success) {
        setNumberOfFollowers(numberOfFollowers + 1);
        console.log(response.data.profileUser);
        setButtonState(UNFOLLOW_BUTTON);
        setIsLoading(false);
      } else {
        alert('Failed to follow user');
      }
    });
  };

  const onUnfollowClicked = () => {
    setIsLoading(true);

    let variables = {
      profileOwnerUserId: userProfileInfo._id,
      followersList: userProfileInfo.followers.filter(
        (follower) => follower !== userId
      )
    };

    axios.post('/api/users/follow', variables).then((response) => {
      if (response.data.success) {
        setNumberOfFollowers(numberOfFollowers - 1);
        setButtonState(FOLLOW_BUTTON);
        setIsLoading(false);
      } else {
        alert('Failed to unfollow user');
      }
    });
  };

  const onRemoveClicked = () => {};

  console.log(userProfileInfo, props, isLoading, numberOfFollowers);

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
            userId={userProfileInfo._id}
          />
          <div style={{ paddingLeft: '24px' }}>
            <h2>{userProfileInfo.username}</h2>
            <h4 style={{ color: '#808080' }}>
              {numberOfFollowers}&nbsp;followers
            </h4>
          </div>
        </div>
        <div>
          {isLoading ? (
            <Button color='secondary' size='lg' disabled>
              Loading...
            </Button>
          ) : !isLoading && buttonState === UNFOLLOW_BUTTON ? (
            <Button color='secondary' size='lg' onClick={onUnfollowClicked}>
              Unfollow
            </Button>
          ) : !isLoading && buttonState === FOLLOW_BUTTON ? (
            <Button color='primary' size='lg' onClick={onFollowClicked}>
              Follow
            </Button>
          ) : null}

          <Button color='danger' size='lg'>
            Remove
          </Button>
        </div>
      </>
    </div>
  );
};

export default UserList;
