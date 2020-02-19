import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdbreact';
import { format, formatDistanceToNow, compareAsc } from 'date-fns';

import { FirebaseContext } from '../../firebase/firebase';

import OrdersList from '../../components/orders-list/OrdersList';
import CloseTabModal from '../../components/close-tab-modal/CloseTabModal';
import NewOrderModal from '../../components/new-order-modal/NewOrderModal';

const CustomerDetailPage = ({ history, match }) => {
  const { currentUser, customers } = React.useContext(FirebaseContext);

  const { params } = match;
  const { handle } = params;

  const [customer, setCustomer] = React.useState();

  React.useEffect(() => {
    if (!currentUser) {
      history.push('/sign-in');
    }
  }, [currentUser, history]);

  React.useEffect(() => {
    if (customers)
      setCustomer(customers.find(customer => customer.handle === handle));
  }, [customers, handle]);

  const renderActiveTab = () => {
    if (!customer.hasActiveTab) return;

    const activeTab = customer.tabs[0];

    return (
      <MDBCard
        className="d-flex my-4"
        style={{
          borderRadius: 10,
          borderColor: '#000000',
          borderWidth: '10px'
        }}
      >
        <MDBCardBody>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Active - SR {activeTab.tabAmount}.00</h4>
            <CloseTabModal selectedCustomer={customer} activeTab={activeTab} />
          </div>
          <p className="text-left mb-1">
            {compareAsc(activeTab.dueDate.toDate(), new Date()) === -1
              ? 'OVERDUE'
              : `Settlement due ${formatDistanceToNow(
                  activeTab.dueDate.toDate(),
                  {
                    addSuffix: true
                  }
                )}`}
          </p>
          <p className="text-left mb-1">
            Start date:{' '}
            <strong className="text-muted">
              {format(activeTab.startDate.toDate(), 'do MMMM, yyyy')}
            </strong>
          </p>
          <p className="text-left">
            Due date:{' '}
            <strong className="text-muted">
              {format(activeTab.dueDate.toDate(), 'do MMMM, yyyy')}
            </strong>
          </p>
          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <h5>Orders ({activeTab.orders.length})</h5>
            <NewOrderModal selectedCustomer={customer} buttonType="icon" />
          </div>
          <OrdersList orders={activeTab.orders} />
        </MDBCardBody>
      </MDBCard>
    );
  };

  const renderClosedTabs = () => {
    const closedTabs = customer.hasActiveTab
      ? customer.tabs.filter((tab, index) => index !== 0)
      : customer.tabs;

    return closedTabs.map((tab, index) => (
      <MDBCard
        key={index}
        className={`mb-3 ${!tab.active && 'grey lighten-4'}`}
      >
        <MDBCardBody>
          <h4 className="d-flex justify-content-between align-items-center">
            Closed - SR {tab.tabAmount}.00
          </h4>

          <p className="text-left mb-1">
            Start date:{' '}
            <strong className="text-muted">
              {format(tab.startDate.toDate(), 'do MMMM, yyyy')}
            </strong>
          </p>
          <p className="text-left mb-1">
            Due date:{' '}
            <strong className="text-muted">
              {format(tab.dueDate.toDate(), 'do MMMM, yyyy')}
            </strong>
          </p>
          <p className="text-left">
            Settled on:{' '}
            <strong className="text-muted">
              {format(tab.closedAt.toDate(), 'do MMMM, yyyy')}
            </strong>
          </p>
          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <h5>Orders ({tab.orders.length})</h5>
          </div>
          <OrdersList orders={tab.orders} />
        </MDBCardBody>
      </MDBCard>
    ));
  };

  return (
    <div>
      <MDBContainer className="text-center mt-5 pt-5">
        <h5>Customer Account Details</h5>
        <MDBContainer className="justify-content-center my-4">
          {!customer ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <h2>- {customer.displayName} -</h2>
              {renderActiveTab()}

              <hr />
              <h4 className="mb-4">
                History ({customer.tabs.length - 1} tabs)
              </h4>

              {renderClosedTabs()}
            </>
          )}
        </MDBContainer>
      </MDBContainer>
    </div>
  );
};

export default CustomerDetailPage;
