import React from 'react';
import { MDBContainer } from 'mdbreact';

const SignInPage = () => {
  const container = { height: 1300 };

  return (
    <div>
      <MDBContainer style={container} className="text-center mt-5 pt-5">
        <h2>Sign In</h2>
      </MDBContainer>
    </div>
  );
};

export default SignInPage;
