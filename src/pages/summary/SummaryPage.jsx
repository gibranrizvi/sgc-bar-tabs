import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

import FirebaseContext from '../../firebase/context';
import RecentOrdersTable from '../../components/recent-orders-table/RecentOrdersTable';
import ActiveTabsTable from '../../components/active-tabs-table/ActiveTabsTable';
import SeybrewTabsTable from '../../components/seybrew-tabs-table/SeybrewTabsTable';
import RegisterFormModal from '../../components/register-form-modal/RegisterFormModal';

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
            <MDBBtn
              block
              size="lg"
              gradient="peach"
              rounded
              onClick={() => history.push('/new-order')}
            >
              <MDBIcon icon="plus" className="pr-2" /> New Order
            </MDBBtn>
          </MDBCol>
          <MDBCol md="4" className="z">
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
              <Link to="/orders">View All</Link>
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
