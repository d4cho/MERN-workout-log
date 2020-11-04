import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge
} from 'reactstrap';
import classnames from 'classnames';

import PulseLoader from 'react-spinners/PulseLoader';
import MyStatsPage from './Sections/MyStatsPage';
import MyPostsPage from './Sections/MyPostsPage';
import NotificationsPage from './Sections/NotificationsPage';
import FollowersPage from './Sections/FollowersPage';
import FollowingPage from './Sections/FollowingPage';

import notificationHandler from '../utils/notificationHandler';

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
  const [notifications, setNotifications] = useState([]);
  const [buttonState, setButtonState] = useState(DISABLE_BUTTON);
  const [newNotifications, setNewNotifications] = useState(0);

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
          setNotifications(response.data.user.notifications.reverse());

          checkNumberOfNewNotifications(response.data.user.notifications);

          // check for new(unread) notifications and store number in state
          // NEED TO FIND A WAY TO CHECK UNREAD NOTIFICATIONS!!!!!!!!!!!!
          // maybe
          // populate notifications with mongoose and check seenByUser
          // then
          // send populated notifications array to NotificationsPage
          // https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array

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

  const checkNumberOfNewNotifications = (notificationsList) => {
    let count = 0;

    for (const notification of notificationsList) {
      if (!notification.seenByUser) {
        count++;
      }
    }

    setNewNotifications(count);
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

        // create a notification on server
        notificationHandler('follow', userId, userId, profilePageUserId);
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
                  {newNotifications > 0 && (
                    <Badge color='primary' style={{ marginLeft: '12px' }}>
                      {newNotifications}
                    </Badge>
                  )}
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
              {notifications.length > 0 ? (
                <NotificationsPage
                  notificationsList={notifications}
                  refreshFunction={getMyProfileInfo}
                />
              ) : (
                <div
                  style={{
                    padding: '24px',
                    width: '70%',
                    backgroundColor: '#F5F5F5',
                    border: '1px solid blue',
                    margin: 'auto',
                    marginTop: '24px',
                    textDecoration: 'none'
                  }}>
                  <h2>You have no new notifications</h2>
                </div>
              )}
            </TabPane>
          </>
        )}
      </TabContent>
    </div>
  );
};

export default ProfilePage;
