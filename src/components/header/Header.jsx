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

import { auth } from '../../firebase/firebase';

const Header = ({ history, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItemStyles = {
    padding: 0,
    color: 'black',
    fontWeight: 400
  };

  const isCustomer = currentUser && currentUser.role === 'customer';

  const onClick = () => setIsOpen(prev => !prev);

  const currentTab = history.location.pathname;

  return (
    <header>
      <MDBNavbar color="blue-gradient" dark expand="md" scrolling fixed="top">
        <MDBContainer>
          <MDBNavbarBrand>
            <strong className="white-text">SGC Bar Tabs</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={onClick} />
          <MDBCollapse id="navbarCollapse" isOpen={isOpen} navbar>
            {currentUser && (
              <>
                {!isCustomer ? (
                  <MDBNavbarNav left>
                    <MDBNavItem active={currentTab === '/'}>
                      <MDBNavLink to="/">Summary</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={currentTab === '/orders'}>
                      <MDBNavLink to="/orders">Orders</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={currentTab === '/active'}>
                      <MDBNavLink to="/active">Active</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={currentTab === '/seybrew'}>
                      <MDBNavLink to="/seybrew">Seybrew</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active={currentTab === '/customers'}>
                      <MDBNavLink to="/customers">Customers</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                ) : (
                  <MDBNavbarNav left>
                    <MDBNavItem active={currentTab === '/'}>
                      <MDBNavLink to="/">Summary</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                )}
              </>
            )}

            <MDBNavbarNav right>
              {currentUser ? (
                <>
                  {!isCustomer && (
                    <MDBNavItem>
                      <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                          <MDBIcon icon="plus" />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default">
                          <MDBDropdownItem>
                            <MDBLink
                              to="/create-order"
                              style={dropdownItemStyles}
                            >
                              New Order
                            </MDBLink>
                          </MDBDropdownItem>
                          <MDBDropdownItem>
                            <MDBLink
                              to="/add-seybrews"
                              style={dropdownItemStyles}
                            >
                              Add Seybrews
                            </MDBLink>
                          </MDBDropdownItem>
                          <MDBDropdownItem>
                            <MDBLink to="/register" style={dropdownItemStyles}>
                              Create User
                            </MDBLink>
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </MDBNavItem>
                  )}
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user" />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem>
                          <MDBLink
                            to="/change-password"
                            style={dropdownItemStyles}
                          >
                            Change Password
                          </MDBLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBLink
                            to="#"
                            onClick={() => auth.signOut()}
                            style={dropdownItemStyles}
                          >
                            Sign Out
                          </MDBLink>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </>
              ) : (
                <MDBNavItem>
                  <MDBNavLink to="/sign-in">Sign In</MDBNavLink>
                </MDBNavItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
};

export default withRouter(Header);
