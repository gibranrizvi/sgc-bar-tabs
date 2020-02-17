import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

import FirebaseContext from '../../firebase/context';
import RecentOrdersTable from '../../components/recent-orders-table/RecentOrdersTable';
import ActiveTabsTable from '../../components/active-tabs-table/ActiveTabsTable';
import SeybrewTabsTable from '../../components/seybrew-tabs-table/SeybrewTabsTable';

const SummaryPage = ({ history }) => {
  const { currentUser } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    if (!currentUser) {
      history.push('/sign-in');
    }
  }, [currentUser, history]);

  return (
    <div className="Summary">
      <MDBContainer className="text-center mt-5 pt-5">
        <h2>Summary</h2>
        <MDBRow className="mt-4 text-center">
          <MDBCol md="12" className="mb-4">
            <MDBBtn size="lg" gradient="peach" rounded onClick={() => {}}>
              <MDBIcon icon="plus" className="pr-2" /> New Order
            </MDBBtn>
            <MDBBtn size="lg" gradient="blue" rounded onClick={() => {}}>
              <MDBIcon icon="beer" className="pr-2" /> Add Seybrews
            </MDBBtn>
            <MDBBtn
              size="lg"
              gradient="purple"
              rounded
              onClick={() => history.push('/register')}
            >
              <MDBIcon icon="user" className="pr-2" /> New Customer
            </MDBBtn>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol md="6" className="my-2">
            {/* Recent orders table */}
            <div className="w-responsive mx-auto">
              <h5>Recent orders</h5>
              <Link to="/orders">View All</Link>
              <RecentOrdersTable />
            </div>
          </MDBCol>
          <MDBCol md="6" className="my-2">
            {/* Overdue tabs table */}
            <div className="w-responsive mx-auto">
              <h5>Overdue tabs</h5>
              <Link to="/active">View All</Link>
              <ActiveTabsTable />
            </div>
          </MDBCol>
          <MDBCol md="6" className="my-2">
            {/* Seybrew tabs table */}
            <div className="w-responsive mx-auto">
              <h5>Seybrew tabs</h5>
              <Link to="/seybrew">View All</Link>
              <SeybrewTabsTable />
            </div>
          </MDBCol>
          <MDBCol md="6" className="my-2">
            {/* Active tabs table */}
            <div className="w-responsive mx-auto">
              <h5>Active tabs</h5>
              <Link to="/active">View All</Link>
              <ActiveTabsTable />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default SummaryPage;
