import React from 'react';
import {
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBListGroupItem
} from 'mdbreact';

import { addSeybrews, FirebaseContext } from '../../firebase/firebase';

const AddSeybrewsModal = ({ buttonType, selectedCustomer }) => {
  const { customers, currentUser } = React.useContext(FirebaseContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [searchCustomerTerm, setSearchCustomerTerm] = React.useState('');
  const [customer, setCustomer] = React.useState('');
  const [seybrewsToAdd, setSeybrewsToAdd] = React.useState(0);
  const [error, setError] = React.useState('');

  const toggle = () => {
    setError('');
    return setModalOpen(prev => !prev);
  };

  React.useState(() => {
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    if (customer.seybrewTab.count + seybrewsToAdd < 0) {
      return setError('Total amount must be 0 or more');
    }

    setSubmitting(true);

    try {
      const data = {
        customer,
        seybrewsToAdd,
        createdBy: currentUser
      };

      // console.log(data);

      await addSeybrews(data);

      setSubmitting(false);

      setCustomer('');
      setSeybrewsToAdd(0);

      return toggle();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  const renderCustomerSearchResults = () => {
    const filteredCustomers = customers.filter(customer =>
      customer.displayName
        .toLowerCase()
        .includes(searchCustomerTerm.toLowerCase())
    );

    if (customer) {
      return (
        <MDBListGroupItem
          className="d-flex justify-content-between align-items-center"
          hover
        >
          {customer.displayName}
          <MDBIcon
            className="pointer"
            icon="times"
            onClick={() => {
              setSearchCustomerTerm('');
              return setCustomer('');
            }}
          />
        </MDBListGroupItem>
      );
    } else {
      if (searchCustomerTerm) {
        return filteredCustomers.map(customer => (
          <MDBListGroupItem
            key={customer.id}
            onClick={() => {
              return setCustomer(customer);
            }}
            hover
            className="d-flex justify-content-left align-items-center pointer"
          >
            {customer.displayName}
          </MDBListGroupItem>
        ));
      }
    }
  };

  return (
    <>
      {buttonType === 'icon' ? (
        <MDBIcon className="pointer" icon="plus" onClick={toggle} />
      ) : (
        <MDBBtn block size="lg" gradient="blue" rounded onClick={toggle}>
          <MDBIcon icon="beer" className="pr-2" /> Add Seybrews
        </MDBBtn>
      )}
      <MDBModal isOpen={modalOpen} toggle={toggle} fullHeight position="left">
        <form onSubmit={handleSubmit} noValidate>
          <MDBModalHeader toggle={toggle}>Add Seybrews</MDBModalHeader>
          <MDBModalBody>
            {/* Customer selection */}
            {!customer && (
              <MDBInput
                label="Search Customers"
                type="text"
                value={searchCustomerTerm}
                onChange={({ target }) => setSearchCustomerTerm(target.value)}
                outline
              />
            )}
            {customers && renderCustomerSearchResults()}
            <hr />

            {/* Order creation */}
            {customer && (
              <p>Seybrew Tab: {customer.seybrewTab.count} available</p>
            )}

            <MDBInput
              label="Amount To Add"
              type="number"
              value={seybrewsToAdd}
              onChange={({ target }) => setSeybrewsToAdd(Number(target.value))}
              outline
            >
              {error && (
                <p className="text-left" style={{ color: 'red', fontSize: 12 }}>
                  {error}
                </p>
              )}
            </MDBInput>

            <hr />

            {customer && (
              <p>New Amount: {customer.seybrewTab.count + seybrewsToAdd}</p>
            )}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn gradient="peach" onClick={toggle}>
              Cancel
            </MDBBtn>
            <MDBBtn
              type="submit"
              gradient="blue"
              disabled={!customer || !seybrewsToAdd}
            >
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

export default AddSeybrewsModal;
