import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import FirebaseContext from '../../firebase/context';

const SeybrewTabsTable = ({ history }) => {
  const { customers } = React.useContext(FirebaseContext);

  const renderTableRow = customer => {
    const { id, displayName, seybrewTab } = customer;

    const { count } = seybrewTab;

    return (
      <tr
        onClick={() => history.push(`/customer/${customer.handle}`)}
        className="pointer"
        key={id}
      >
        <td>{displayName}</td>
        <td>{count}</td>
        <td>Add Seybrews</td>
      </tr>
    );
  };

  return (
    <div className="recent-orders-table mt-3">
      <MDBTable small hover responsive striped fixed>
        <MDBTableHead color="blue-gradient" textWhite>
          <tr>
            <th>Name</th>
            <th>Total Seybrews</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {customers &&
            customers
              .sort((a, b) => b.seybrewTab.count - a.seybrewTab.count)
              .map(customer => renderTableRow(customer))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default SeybrewTabsTable;
