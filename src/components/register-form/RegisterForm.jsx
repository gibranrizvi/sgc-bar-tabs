import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import {
  createNewUser,
  createUserProfileDocument
} from '../../firebase/firebase';

const RegisterForm = ({ currentUser, history }) => {
  const [values, setValues] = React.useState({
    displayName: '',
    role: 'customer', // TODO Hard-coded for now
    telephone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = React.useState({});

  const {
    displayName,
    role,
    telephone,
    email,
    password,
    confirmPassword
  } = values;

  const handleSubmit = async event => {
    event.preventDefault();

    // Validation
    if (!displayName) {
      return setErrors({ ...errors, displayName: 'Name is required' });
    } else if (!telephone) {
      return setErrors({
        ...errors,
        displayName: '',
        telephone: 'Please enter a telephone number'
      });
    } else if (!password) {
      return setErrors({
        ...errors,
        telephone: '',
        password: 'Password is required'
      });
    } else if (!confirmPassword) {
      return setErrors({
        ...errors,
        password: '',
        confirmPassword: 'Please confirm password'
      });
    } else if (password !== confirmPassword) {
      return setErrors({
        ...errors,
        password: '',
        confirmPassword: 'Passwords do not match'
      });
    } else if (
      email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      return setErrors({ email: 'Email is invalid' });
    }

    setErrors({});

    const formattedName = displayName
      .trim()
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
    const handle = displayName
      .toLowerCase()
      .trim()
      .replace(' ', '-');
    const formattedEmail = email ? email : handle + '@sgcbar.com';

    try {
      const user = await createNewUser(formattedEmail, password);

      const { uid, email } = user;

      const userData = {
        uid,
        displayName: formattedName,
        handle,
        role,
        telephone,
        email,
        createdBy: currentUser
      };

      await createUserProfileDocument(userData);

      return history.push('/');
    } catch (error) {
      console.log(error);
      return setErrors({
        email: 'Email is already in use'
      });
    }
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="3"></MDBCol>
        <MDBCol md="6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grey-text">
              <MDBInput
                label="Name"
                size="lg"
                type="text"
                value={displayName}
                onChange={({ target }) =>
                  setValues({
                    ...values,
                    displayName: target.value
                  })
                }
                outline
              >
                {errors.displayName && (
                  <p className="text-left" style={{ color: 'red' }}>
                    {errors.displayName}
                  </p>
                )}
              </MDBInput>
              <MDBInput
                label="Telephone"
                size="lg"
                type="text"
                value={telephone}
                onChange={({ target }) =>
                  setValues({ ...values, telephone: target.value })
                }
                outline
              >
                {errors.telephone && (
                  <p className="text-left" style={{ color: 'red' }}>
                    {errors.telephone}
                  </p>
                )}
              </MDBInput>
              <p>Role is customer</p>
              <MDBInput
                label="Email"
                size="lg"
                type="email"
                value={email}
                onChange={({ target }) =>
                  setValues({ ...values, email: target.value })
                }
                outline
              >
                {errors.email && (
                  <p className="text-left" style={{ color: 'red' }}>
                    {errors.email}
                  </p>
                )}
              </MDBInput>
              <MDBInput
                label="Password"
                size="lg"
                type="password"
                value={password}
                onChange={({ target }) =>
                  setValues({ ...values, password: target.value })
                }
                outline
              >
                {errors.password && (
                  <p className="text-left" style={{ color: 'red' }}>
                    {errors.password}
                  </p>
                )}
              </MDBInput>
              <MDBInput
                label="Confirm Password"
                size="lg"
                type="password"
                value={confirmPassword}
                onChange={({ target }) =>
                  setValues({ ...values, confirmPassword: target.value })
                }
                outline
              >
                {errors.confirmPassword && (
                  <p className="text-left" style={{ color: 'red' }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </MDBInput>
            </div>
            <div className="text-center">
              <MDBBtn
                rounded
                gradient="blue"
                type="submit"
                size="lg"
                block
                disabled={false}
              >
                Register
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="3"></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RegisterForm;
