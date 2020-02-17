import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <MDBFooter
      color="blue-gradient"
      className="font-small mt-5"
      // style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
    >
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          <Link to="/"> Seychelles Golf Club Bar Tabs </Link> &copy;{' '}
          {new Date().getFullYear()}
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
