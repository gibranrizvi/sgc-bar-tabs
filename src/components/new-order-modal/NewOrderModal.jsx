import React from 'react';
import {
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBListGroup,
  MDBListGroupItem
} from 'mdbreact';

import { FirebaseContext } from '../../firebase/firebase';

const NewOrderModal = ({ currentUser }) => {
  const { customers } = React.useContext(FirebaseContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [values, setValues] = React.useState({
    orderedBy: '',
    total: 0,
    items: []
  });
  const [errors, setErrors] = React.useState({});

  const { orderedBy, total, items } = values;

  const toggle = () => setModalOpen(prev => !prev);

  const handleSubmit = async event => {
    event.preventDefault();

    // Validation

    return console.log(values);
    setSubmitting(true);

    setErrors({});

    try {
      const orderData = {
        orderedBy,
        total,
        items,
        createdBy: currentUser
      };

      // await createOrderDocument(orderData);

      setSubmitting(false);
      setValues({
        orderedBy: '',
        total: 0,
        items: []
      });
      return toggle();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      return setErrors({});
    }
  };

  const renderList = () => {
    const filteredCustomers = customers.filter(customer =>
      customer.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (orderedBy) {
      return (
        <MDBListGroupItem
          className="d-flex justify-content-between align-items-center"
          hover
        >
          {orderedBy.displayName}
          <MDBIcon
            className="pointer"
            icon="times"
            onClick={() => {
              setSearchTerm('');
              return setValues({ ...values, orderedBy: '' });
            }}
          />
        </MDBListGroupItem>
      );
    } else {
      if (searchTerm) {
        return filteredCustomers.map(customer => (
          <MDBListGroupItem
            key={customer.id}
            onClick={() => {
              setSearchTerm(customer.displayName);
              return setValues({ ...values, orderedBy: customer });
            }}
            hover
            className="pointer"
          >
            {customer.displayName}
          </MDBListGroupItem>
        ));
      } else {
        return <p>Search customer name</p>;
      }
    }
  };

  return (
    <>
      <MDBBtn block size="lg" gradient="peach" rounded onClick={toggle}>
        <MDBIcon icon="user" className="pr-2" /> New Order
      </MDBBtn>
      <MDBModal isOpen={modalOpen} toggle={toggle} fullHeight position="right">
        <form onSubmit={handleSubmit} noValidate>
          <MDBModalHeader toggle={toggle}>Create New Order</MDBModalHeader>
          <MDBModalBody>
            {!orderedBy && (
              <MDBInput
                label="Search"
                type="text"
                value={searchTerm}
                onChange={({ target }) => setSearchTerm(target.value)}
                outline
              />
            )}
            <MDBListGroup>{customers && renderList()}</MDBListGroup>
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
                'Confirm'
              )}
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </>
  );
};

export default NewOrderModal;
