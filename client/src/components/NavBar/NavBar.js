import React, { useState } from 'react';
import { logoutUser } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import ProfilePic from '../utils/ProfilePic';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <Navbar color='dark' dark expand='md'>
        <NavLink href='/' style={{ fontSize: '50px' }}>
          <FaDumbbell />
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink href='/mylogs'>My Logs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/posts'>Posts</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            {user.userData && user.userData.isAuth ? (
              <>
                <ProfilePic
                  width={'48px'}
                  height={'48px'}
                  image={user.userData.image}
                />
                <NavItem>
                  <NavLink href={`/myprofile`}>My Profile</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logoutHandler} href={`/`}>
                    Logout
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink href='/login'>Log In</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/register'>Register</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
