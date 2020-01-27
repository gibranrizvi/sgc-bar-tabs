import React from 'react';
import { MDBContainer, MDBRow } from 'mdbreact';
import SignInForm from '../../components/sign-in-form/SignInForm';

const SignInPage = () => {
  return (
    <div>
      <MDBContainer className="text-center mt-5 pt-5">
        <h2>Sign In</h2>
        <br />
        <MDBRow>
          <SignInForm />
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default SignInPage;
