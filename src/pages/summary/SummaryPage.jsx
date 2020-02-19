import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';

import FirebaseContext from '../../firebase/context';
import ActiveTabsTable from '../../components/active-tabs-table/ActiveTabsTable';
import SeybrewTabsTable from '../../components/seybrew-tabs-table/SeybrewTabsTable';
import RegisterFormModal from '../../components/register-form-modal/RegisterFormModal';
import NewOrderModal from '../../components/new-order-modal/NewOrderModal';
import AddSeybrewsModal from '../../components/add-seybrews-modal/AddSeybrewsModal';

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
          <MDBCol md="4" className="mb-2">
            <NewOrderModal currentUser={currentUser} />
          </MDBCol>
          <MDBCol md="4" className="mb-2">
            <AddSeybrewsModal currentUser={currentUser} />
          </MDBCol>
          <MDBCol md="4" className="mb-2">
            <RegisterFormModal currentUser={currentUser} />
          </MDBCol>
        </MDBRow>

        <MDBRow>
          {/*<MDBCol md="6" className="my-2">
            <div>
              <h5>Recent orders</h5>
              <Link to="#">View More</Link>
              <RecentOrdersTable />
            </div>
          </MDBCol>
          <MDBCol md="6" className="my-2">
            <div>
              <h5>Overdue tabs</h5>
              <Link to="/active">View All</Link>
              <ActiveTabsTable />
            </div>
          </MDBCol>*/}
          <MDBCol md="6" className="my-2">
            {/* Active tabs table */}
            <div>
              <h5>Active tabs</h5>
              <Link to="/customers">View All</Link>
              <ActiveTabsTable history={history} />
            </div>
          </MDBCol>
          <MDBCol md="6" className="my-2">
            {/* Seybrew tabs table */}
            <div>
              <h5>Seybrew tabs</h5>
              <Link to="/customers">View All</Link>
              <SeybrewTabsTable history={history} />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default SummaryPage;
