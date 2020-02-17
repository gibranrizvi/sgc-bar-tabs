import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';

import {
  createNewUser,
  createUserProfileDocument
} from '../../firebase/firebase';

const RegisterFormModal = ({ currentUser, history }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

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

  const toggle = () => setModalOpen(prev => !prev);

  return (
    <>
      <MDBBtn size="lg" gradient="purple" rounded onClick={toggle}>
        <MDBIcon icon="user" className="pr-2" /> New Customer
      </MDBBtn>
      <MDBModal isOpen={modalOpen} toggle={toggle} fullHeight position="left">
        <form onSubmit={handleSubmit} noValidate>
          <MDBModalHeader toggle={toggle}>Create New Customer</MDBModalHeader>
          <MDBModalBody>
            <div className="grey-text">
              <MDBInput
                label="Name"
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
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn gradient="peach" onClick={toggle}>
              Cancel
            </MDBBtn>
            <MDBBtn type="submit" gradient="blue">
              Register
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </>
  );
};

export default RegisterFormModal;
