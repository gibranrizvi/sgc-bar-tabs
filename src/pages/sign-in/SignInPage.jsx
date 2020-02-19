import React from 'react';
import { MDBContainer } from 'mdbreact';

import SignInForm from '../../components/sign-in-form/SignInForm';

import FirebaseContext from '../../firebase/context';

const SignInPage = ({ history }) => {
  const { currentUser } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    if (currentUser) {
      history.push('/');
    } else {
    }
  }, [currentUser, history]);

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
