import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { FirebaseContext } from '../../firebase/firebase';

import NewOrderModal from '../new-order-modal/NewOrderModal';
import CloseTabModal from '../close-tab-modal/CloseTabModal';

const ActiveTabsTable = ({ history }) => {
  const { customers } = React.useContext(FirebaseContext);

  const renderTableRow = customer => {
    const { id, displayName, tabs } = customer;

    const activeTab = tabs[tabs.length - 1];

    const startDate = format(activeTab.startDate.toDate(), 'dd/MM/yyyy');
    const dueDate = format(activeTab.dueDate.toDate(), 'dd/MM/yyyy');

    return (
      <tr key={id}>
        <td>
          <Link to={`/customer/${customer.handle}`}>
            <strong>{displayName}</strong>
          </Link>
        </td>
        <td>SR {activeTab.tabAmount}.00</td>
        <td>{startDate}</td>
        <td>{dueDate}</td>
        <td>
          <NewOrderModal buttonType="icon" selectedCustomer={customer} />
          {/*<MDBIcon
            className="pointer mr-2"
            icon="mobile-alt"
            onClick={() => console.log(`Send SMS to ${displayName}`)}
          />*/}
          <CloseTabModal
            buttonType="icon"
            selectedCustomer={customer}
            activeTab={activeTab}
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="recent-orders-table mt-3">
      <MDBTable small hover responsive striped>
        <MDBTableHead color="purple-gradient" textWhite>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {customers &&
            customers.map(
              customer => customer.hasActiveTab && renderTableRow(customer)
            )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default ActiveTabsTable;
