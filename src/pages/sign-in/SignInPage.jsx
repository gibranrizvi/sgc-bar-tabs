import React from 'react';
import { MDBContainer } from 'mdbreact';
import SignInForm from '../../components/sign-in-form/SignInForm';

const SignInPage = ({ currentUser, history }) => {
  return (
    <div className="SignIn">
      <MDBContainer className="text-center mt-5 pt-5">
        <h2>Sign In</h2>
        <br />
        <SignInForm />
      </MDBContainer>
    </div>
  );
};

export default SignInPage;
