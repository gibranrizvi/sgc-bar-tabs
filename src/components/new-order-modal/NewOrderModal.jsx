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
  MDBListGroupItem,
  MDBBadge
} from 'mdbreact';

import { FirebaseContext } from '../../firebase/firebase';
import beverageList from '../../beverage-list/beverageList';

const NewOrderModal = ({ currentUser }) => {
  const { customers } = React.useContext(FirebaseContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [searchCustomerTerm, setSearchCustomerTerm] = React.useState('');
  const [searchBeverageTerm, setSearchBeverageTerm] = React.useState('');

  const [addedBeverages, setAddedBeverages] = React.useState([]);
  const [availableBeverages, setAvailableBeverages] = React.useState(
    beverageList
  );
  const [values, setValues] = React.useState({
    orderedBy: '',
    total: 0,
    order: []
  });
  const [errors, setErrors] = React.useState({});

  const { orderedBy, total, order } = values;

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
        order,
        createdBy: currentUser
      };

      // await createOrderDocument(orderData);

      setSubmitting(false);
      setValues({
        orderedBy: '',
        total: 0,
        order: []
      });
      return toggle();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      return setErrors({});
    }
  };

  const renderCustomerSearchResults = () => {
    const filteredCustomers = customers.filter(customer =>
      customer.displayName
        .toLowerCase()
        .includes(searchCustomerTerm.toLowerCase())
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
              setSearchCustomerTerm('');
              return setValues({ ...values, orderedBy: '' });
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
              return setValues({ ...values, orderedBy: customer });
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

  const renderBeverageSearchResults = () => {
    const filteredBeverages = availableBeverages.filter(item =>
      item.name.toLowerCase().includes(searchBeverageTerm.toLowerCase())
    );

    if (searchBeverageTerm) {
      return filteredBeverages.map(item => (
        <MDBListGroupItem
          key={item.id}
          onClick={() => updateBeverageLists(item)}
          hover
          className="d-flex justify-content-left align-items-center pointer"
        >
          {item.name}
        </MDBListGroupItem>
      ));
    }
  };

  const renderBeveragePills = () => (
    <div className="text-left my-4">
      {availableBeverages.map(item => (
        <MDBBadge
          key={item.id}
          color="primary"
          pill
          className="mr-1 pointer"
          onClick={() => updateBeverageLists(item)}
        >
          {item.name}
        </MDBBadge>
      ))}
    </div>
  );

  const renderOrder = () => {
    return addedBeverages.map(({ id, name, price }) => (
      <MDBListGroupItem
        key={id}
        hover
        className="d-flex justify-content-left align-items-center pointer"
      >
        {name} - SR {price}.00
      </MDBListGroupItem>
    ));
  };

  const updateBeverageLists = item => {
    const newBeverageList = [...addedBeverages, { ...item, count: 1 }];
    setAddedBeverages(newBeverageList);
    setValues({ ...values, order: addedBeverages });

    return setAvailableBeverages(
      availableBeverages.filter(({ id }) => id !== item.id)
    );
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
            {/* Customer selection */}
            {!orderedBy && (
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
            <MDBInput
              label="Search Beverages"
              type="text"
              value={searchBeverageTerm}
              onChange={({ target }) => setSearchBeverageTerm(target.value)}
              outline
            />
            {renderBeverageSearchResults()}
            {renderBeveragePills()}
            <p className="text-center">Current Order</p>
            {renderOrder()}
            <hr />
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
