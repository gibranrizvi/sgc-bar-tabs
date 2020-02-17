import React from 'react';
import {
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
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
  const [customer, setCustomer] = React.useState('');
  const [order, setOrder] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const [errors, setErrors] = React.useState({});

  const toggle = () => setModalOpen(prev => !prev);

  const handleSubmit = async event => {
    event.preventDefault();

    // Validation

    setSubmitting(true);

    setErrors({});

    try {
      const orderData = {
        customer,
        total,
        order,
        createdBy: currentUser
      };

      // await createOrderDocument(orderData);

      setSubmitting(false);

      setCustomer('');
      setOrder([]);
      setTotal(0);

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

  const renderBeverageSearchResults = () => {
    const filteredBeverages = getAvailableBeverages().filter(item =>
      item.name.toLowerCase().includes(searchBeverageTerm.toLowerCase())
    );

    if (searchBeverageTerm) {
      return filteredBeverages.map(item => (
        <MDBListGroupItem
          key={item.id}
          onClick={() => addBeverage(item)}
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
      {getAvailableBeverages().map(item => (
        <MDBBadge
          key={item.id}
          color="primary"
          pill
          className="mr-1 pointer"
          onClick={() => addBeverage(item)}
        >
          {item.name}
        </MDBBadge>
      ))}
    </div>
  );

  const renderOrder = () => {
    return order.map(item => (
      <MDBListGroupItem
        key={item.id}
        hover
        className="d-flex justify-content-between align-items-center pointer"
      >
        {item.name} - SR {item.price}.00
        <MDBIcon
          className="pointer"
          icon="times"
          onClick={() => removeBeverage(item)}
        />
      </MDBListGroupItem>
    ));
  };

  const addBeverage = item => {
    const updatedOrder = [...order, { ...item, count: 1 }];
    return setOrder(updatedOrder);
  };

  const removeBeverage = item => {
    const updatedOrder = order.filter(({ id }) => id !== item.id);
    return setOrder(updatedOrder);
  };

  const getAvailableBeverages = () =>
    beverageList.filter(({ id }) => !order.some(item => id === item.id));

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
