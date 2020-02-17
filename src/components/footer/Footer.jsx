import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';

const Footer = () => {
  return (
    <MDBFooter
      color="blue-gradient"
      className="font-small mt-5"
      // style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
    >
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          <a href="/"> Seychelles Golf Club Bar Tabs </a> &copy;{' '}
          {new Date().getFullYear()}
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
