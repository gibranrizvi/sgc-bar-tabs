import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import { format } from 'date-fns';

import FirebaseContext from '../../firebase/context';

const ActiveTabsTable = ({ history }) => {
  const { customers } = React.useContext(FirebaseContext);

  const renderTableRow = customer => {
    const { id, displayName, tabs } = customer;

    const activeTab = tabs[tabs.length - 1];

    const startDate = format(activeTab.startDate.toDate(), 'dd/MM/yyyy');
    const dueDate = format(activeTab.dueDate.toDate(), 'dd/MM/yyyy');

    return (
      <tr
        onClick={() => history.push(`/customer/${customer.handle}`)}
        className="pointer"
        key={id}
      >
        <td>{displayName}</td>
        <td>SR {activeTab.tabAmount}.00</td>
        <td>{startDate}</td>
        <td>{dueDate}</td>
        <td>Send SMS - Close Tab</td>
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
