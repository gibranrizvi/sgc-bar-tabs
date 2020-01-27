import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import { auth } from '../../firebase/firebase';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      return await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.message);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="3"></MDBCol>
        <MDBCol md="6">
          <form onSubmit={handleSubmit}>
            <div className="grey-text">
              <MDBInput
                style={{ marginBottom: 24 }}
                label="Email"
                size="lg"
                type="email"
                validate
                error="wrong"
                success="right"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                outline
              />
              <MDBInput
                style={{ marginBottom: 36 }}
                label="Password"
                size="lg"
                type="password"
                validate
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                outline
              />
            </div>
            <div className="text-center">
              <MDBBtn
                gradient="purple"
                type="submit"
                size="lg"
                block
                disabled={!email && !password}
              >
                Log In
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="3"></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignInForm;
