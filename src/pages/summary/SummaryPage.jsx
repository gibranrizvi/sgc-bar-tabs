import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

import FirebaseContext from '../../firebase/context';
import RecentOrdersTable from '../../components/recent-orders-table/RecentOrdersTable';
import ActiveTabsTable from '../../components/active-tabs-table/ActiveTabsTable';
import SeybrewTabsTable from '../../components/seybrew-tabs-table/SeybrewTabsTable';
import RegisterFormModal from '../../components/register-form-modal/RegisterFormModal';
import NewOrderModal from '../../components/new-order-modal/NewOrderModal';

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
        <MDBRow className="mt-5 mb-3 text-center">
          <MDBCol md="4" className="z">
            <NewOrderModal currentUser={currentUser} />
          </MDBCol>
          <MDBCol md="4">
            <MDBBtn
              block
              size="lg"
              gradient="blue"
              rounded
              onClick={() => history.push('/add-seybrews')}
            >
              <MDBIcon icon="beer" className="pr-2" /> Add Seybrews
            </MDBBtn>
          </MDBCol>
          <MDBCol md="4" className="z">
            <RegisterFormModal currentUser={currentUser} />
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol md="6" className="my-2">
            {/* Recent orders table */}
            <div>
              <h5>Recent orders</h5>
              <RecentOrdersTable />
            </div>
          </MDBCol>
          <MDBCol md="6" className="my-2">
            {/* Overdue tabs table */}
            <div>
              <h5>Overdue tabs</h5>
              <Link to="/active">View All</Link>
              <ActiveTabsTable />
            </div>
          </MDBCol>
          <MDBCol md="6" className="my-2">
            {/* Seybrew tabs table */}
            <div>
              <h5>Seybrew tabs</h5>
              <Link to="/seybrew">View All</Link>
              <SeybrewTabsTable />
            </div>
          </MDBCol>
          <MDBCol md="6" className="my-2">
            {/* Active tabs table */}
            <div>
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
