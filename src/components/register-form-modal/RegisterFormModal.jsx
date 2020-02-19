import React from 'react';
import {
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

const RegisterFormModal = ({ currentUser }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
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

  const toggle = () => setModalOpen(prev => !prev);

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
    } else if (password.length < 6) {
      return setErrors({
        ...errors,
        password: 'Password must be at least 6 characters'
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

    setSubmitting(true);

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

      setSubmitting(false);
      setValues({
        displayName: '',
        telephone: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      return toggle();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      return setErrors({
        email: 'Email is already in use'
      });
    }
  };

  return (
    <>
      <MDBBtn block size="lg" gradient="peach" rounded onClick={toggle}>
        <MDBIcon icon="user" className="pr-2" /> New Customer
      </MDBBtn>
      <MDBModal isOpen={modalOpen} toggle={toggle} fullHeight position="left">
        <form onSubmit={handleSubmit} noValidate>
          <MDBModalHeader toggle={toggle}>Create New Customer</MDBModalHeader>
          <MDBModalBody>
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
                <p className="text-left" style={{ color: 'red', fontSize: 12 }}>
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
                <p className="text-left" style={{ color: 'red', fontSize: 12 }}>
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
                <p className="text-left" style={{ color: 'red', fontSize: 12 }}>
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
                <p className="text-left" style={{ color: 'red', fontSize: 12 }}>
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
                <p className="text-left" style={{ color: 'red', fontSize: 12 }}>
                  {errors.confirmPassword}
                </p>
              )}
            </MDBInput>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn gradient="peach" onClick={toggle}>
              Cancel
            </MDBBtn>
            <MDBBtn type="submit" gradient="blue">
              {submitting ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Submitting...</span>
                </div>
              ) : (
                'Register'
              )}
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </>
  );
};

export default RegisterFormModal;
