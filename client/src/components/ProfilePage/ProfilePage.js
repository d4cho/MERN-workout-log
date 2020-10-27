import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import classnames from 'classnames';

import PulseLoader from 'react-spinners/PulseLoader';
import MyStatsPage from './Sections/MyStatsPage';
import MyPostsPage from './Sections/MyPostsPage';
import NotificationsPage from './Sections/NotificationsPage';
import FollowersPage from './Sections/FollowersPage';
import FollowingPage from './Sections/FollowingPage';

const FOLLOW_BUTTON = 'FOLLOW_BUTTON';
const UNFOLLOW_BUTTON = 'UNFOLLOW_BUTTON';
const DISABLE_BUTTON = 'DISABLE_BUTTON';

const ProfilePage = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);
  const [numberOfFollowing, setNumberOfFollowing] = useState(0);
  const [buttonState, setButtonState] = useState(DISABLE_BUTTON);

  const profilePageUserId = props.match.params.userId;
  const userId = localStorage.getItem('userId');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getMyProfileInfo();
  }, []);

  const getMyProfileInfo = () => {
    axios
      .get(`/api/users/getMyProfileInfo?userId=${profilePageUserId}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.user);
          setUserData(response.data.user);
          setFollowersList(response.data.user.followers);
          setFollowingList(response.data.user.following);
          setNumberOfFollowers(response.data.user.followers.length);
          setNumberOfFollowing(response.data.user.following.length);
          if (checkFollowers(response.data.user.followers, userId)) {
            setButtonState(UNFOLLOW_BUTTON);
          } else {
            setButtonState(FOLLOW_BUTTON);
          }
          setIsLoading(false);
        } else {
          alert(`failed to get user's stats`);
        }
      });
  };

  const checkFollowers = (followersList, userId) => {
    return followersList.includes(userId);
  };

  const followClicked = () => {
    setIsLoading(true);
    let variables = {
      profileOwnerUserId: userData._id,
      followersList: followersList.concat(userId)
    };

    console.log(variables);

    axios.post('/api/users/follow', variables).then((response) => {
      if (response.data.success) {
        setNumberOfFollowers(numberOfFollowers + 1);
        setButtonState(UNFOLLOW_BUTTON);
        setIsLoading(false);
        console.log(response.data.profileUser);
      } else {
        alert('Failed to follow user');
      }
    });
  };

  const unfollowClicked = () => {
    setIsLoading(true);
    let variables = {
      profileOwnerUserId: userData._id,
      followersList: followersList.filter((follower) => follower !== userId)
    };

    console.log(variables);

    axios.post('/api/users/follow', variables).then((response) => {
      if (response.data.success) {
        setNumberOfFollowers(numberOfFollowers - 1);
        setButtonState(FOLLOW_BUTTON);
        setIsLoading(false);
        console.log(response.data.profileUser);
      } else {
        alert('Failed to unfollow user');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        margin: '3rem auto'
      }}>
      <Nav tabs style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer', fontSize: '24px' }}
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1');
              }}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer', fontSize: '24px' }}
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2');
              }}>
              {profilePageUserId === userId
                ? 'My Posts'
                : `${userData.username}'s Posts`}
            </NavLink>
          </NavItem>
          {profilePageUserId === userId && followersList && (
            <>
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer', fontSize: '24px' }}
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => {
                    toggle('3');
                  }}>
                  Followers ({numberOfFollowers})
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer', fontSize: '24px' }}
                  className={classnames({ active: activeTab === '4' })}
                  onClick={() => {
                    toggle('4');
                  }}>
                  Following ({numberOfFollowing})
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer', fontSize: '24px' }}
                  className={classnames({ active: activeTab === '5' })}
                  onClick={() => {
                    toggle('5');
                  }}>
                  Notifications
                </NavLink>
              </NavItem>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {profilePageUserId !== userId && (
            <>
              <h4 style={{ paddingRight: '24px' }}>
                {userData.followers ? numberOfFollowers : '0'} followers
              </h4>

              {isLoading ? (
                <Button color='secondary' size='lg' disabled>
                  LOADING...
                </Button>
              ) : !isLoading && buttonState === UNFOLLOW_BUTTON ? (
                <Button color='secondary' size='lg' onClick={unfollowClicked}>
                  UNFOLLOW
                </Button>
              ) : !isLoading && buttonState === FOLLOW_BUTTON ? (
                <Button color='primary' size='lg' onClick={followClicked}>
                  FOLLOW
                </Button>
              ) : null}
            </>
          )}
        </div>
      </Nav>
      <TabContent activeTab={activeTab}>
        {isLoading ? (
          <PulseLoader size={25} color={'#0000FF'} />
        ) : (
          <>
            <TabPane tabId='1'>
              <MyStatsPage
                userData={userData}
                profilePageUserId={profilePageUserId}
              />
            </TabPane>
            <TabPane tabId='2'>
              <MyPostsPage profilePageUserId={profilePageUserId} />
            </TabPane>
            <TabPane tabId='3'>
              <FollowersPage
                followersList={followersList}
                refreshFunction={getMyProfileInfo}
              />
            </TabPane>
            <TabPane tabId='4'>
              <FollowingPage
                followingList={followingList}
                refreshFunction={getMyProfileInfo}
              />
            </TabPane>
            <TabPane tabId='5'>
              <NotificationsPage />
            </TabPane>
          </>
        )}
      </TabContent>
    </div>
  );
};

export default ProfilePage;
