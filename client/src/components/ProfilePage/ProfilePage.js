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

const ProfilePage = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [numberOfFollowers, setNumberOfFollowers] = useState(0);
  const [numberOfFollowing, setNumberOfFollowing] = useState(0);

  const profilePageUserId = props.match.params.userId;
  const userId = localStorage.getItem('userId');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    axios
      .get(`/api/users/getStats?userId=${profilePageUserId}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.user);
          setUserData(response.data.user);
          setFollowersList(response.data.user.followers);
          setFollowingList(response.data.user.following);
          setNumberOfFollowers(response.data.user.followers.length);
          setNumberOfFollowing(response.data.user.following.length);
          setIsFollowing(checkFollowers(response.data.user.followers, userId));
          setIsLoading(false);
        } else {
          alert(`failed to get user's stats`);
        }
      });
  }, []);

  const checkFollowers = (followersList, userId) => {
    return followersList.includes(userId);
  };

  const followClicked = () => {
    let variables = {
      profileOwnerUserId: userData._id,
      followersList: followersList.concat(userId)
    };

    console.log(variables);

    axios.post('/api/users/follow', variables).then((response) => {
      if (response.data.success) {
        setNumberOfFollowers(numberOfFollowers + 1);
        setIsFollowing(true);
        console.log(response.data.profileUser);
      } else {
        alert('Failed to follow user');
      }
    });
  };

  const unfollowClicked = () => {
    let variables = {
      profileOwnerUserId: userData._id,
      followersList: followersList.filter((follower) => follower !== userId)
    };

    console.log(variables);

    axios.post('/api/users/follow', variables).then((response) => {
      if (response.data.success) {
        setNumberOfFollowers(numberOfFollowers - 1);
        setIsFollowing(false);
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
          {profilePageUserId === userId && (
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
              {isFollowing ? (
                <Button color='secondary' size='lg' onClick={unfollowClicked}>
                  UNFOLLOW
                </Button>
              ) : (
                <Button color='primary' size='lg' onClick={followClicked}>
                  FOLLOW
                </Button>
              )}
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
              <FollowersPage followersList={followersList} />
            </TabPane>
            <TabPane tabId='4'>
              <FollowingPage followingList={followingList} />
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
