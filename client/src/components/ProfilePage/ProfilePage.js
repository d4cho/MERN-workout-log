import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import PulseLoader from 'react-spinners/PulseLoader';
import MyStats from './Sections/MyStats';
import MyPosts from './Sections/MyPosts';
import Notifications from './Sections/Notifications';

const ProfilePage = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        } else {
          alert(`failed to get user's stats`);
        }
      });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        margin: '3rem auto'
      }}>
      <Nav tabs>
        <NavItem>
          <NavLink
            style={{ cursor: 'pointer' }}
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: 'pointer' }}
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
          <NavItem>
            <NavLink
              style={{ cursor: 'pointer' }}
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                toggle('3');
              }}>
              Notifications
            </NavLink>
          </NavItem>
        )}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          {isLoading ? (
            <PulseLoader size={25} color={'#0000FF'} />
          ) : (
            <MyStats
              userData={userData}
              profilePageUserId={profilePageUserId}
            />
          )}
        </TabPane>
        <TabPane tabId='2'>
          {isLoading ? (
            <PulseLoader size={25} color={'#0000FF'} />
          ) : (
            <MyPosts profilePageUserId={profilePageUserId} />
          )}
        </TabPane>
        <TabPane tabId='3'>
          <Notifications />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ProfilePage;
