import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from 'mdbreact';

const Header = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItemStyles = {
    padding: 0,
    color: 'black',
    fontWeight: 400
  };

  const onClick = () => setIsOpen(prev => !prev);

  const currentTab = history.location.pathname;

  return (
    <header>
      <MDBNavbar color="indigo" dark expand="md" scrolling fixed="top">
        <MDBContainer>
          <MDBNavbarBrand>
            <strong className="white-text">SGC Bar Tabs</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={onClick} />
          <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active={currentTab === '/'}>
                <MDBNavLink to="/">Summary</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem active={currentTab === '/active'}>
                <MDBNavLink to="/active">Active</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem active={currentTab === '/history'}>
                <MDBNavLink to="/history">History</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem active={currentTab === '/seybrew'}>
                <MDBNavLink to="/seybrew">Seybrew</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem>
                      <MDBLink to="/change-password" style={dropdownItemStyles}>
                        Change Password
                      </MDBLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <MDBLink
                        to="/sign-in"
                        onClick={() => console.log('signed out')}
                        style={dropdownItemStyles}
                      >
                        Sign Out
                      </MDBLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
};

export default withRouter(Header);
