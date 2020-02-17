import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import FirebaseContext from '../../firebase/context';

const ActiveTabsTable = () => {
  const { customers } = React.useContext(FirebaseContext);

  return (
    <div className="recent-orders-table mt-3">
      <MDBTable small hover responsive striped>
        <MDBTableHead color="purple-gradient" textWhite>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Start</th>
            <th>Due</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {customers &&
            customers.map(customer => (
              <tr
                onClick={() => console.log('Do something')}
                className="pointer"
                key={customer.id}
              >
                <td>{customer.displayName}</td>
                <td>SR 250</td>
                <td>16/02/2020</td>
                <td>16/03/2020</td>
                <td>View</td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default ActiveTabsTable;
