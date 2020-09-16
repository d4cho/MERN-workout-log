import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Link to='/' style={{ fontSize: '50px' }}>
          <FaDumbbell />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <Link to='/mylogs'>My Logs</Link>
            </NavItem>
            <NavItem>
              <Link to='/posts'>Posts</Link>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem>
              <NavLink href='/login'>Log In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/register'>Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
