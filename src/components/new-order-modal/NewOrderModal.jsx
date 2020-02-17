import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import {} from '../../firebase/firebase';

const NewOrderForm = ({ currentUser, history }) => {
  const [values, setValues] = React.useState({
    handle: '',
    items: [],
    total: 0
  });
  const [errors, setErrors] = React.useState({});

  const { handle, items, total } = values;

  const handleSubmit = async event => {
    event.preventDefault();

    return console.log({ ...values });

    // Validation

    setErrors({});

    try {
      // Push to corresponding account page
      return history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="3"></MDBCol>
        <MDBCol md="6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grey-text"></div>
            <div className="text-center">
              <MDBBtn
                rounded
                gradient="blue"
                type="submit"
                size="lg"
                block
                disabled={false}
              >
                Confirm Order
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="3"></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default NewOrderForm;
