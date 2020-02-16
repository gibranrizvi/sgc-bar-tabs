import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

import './summary-page.css';

const SummaryPage = ({ currentUser, history }) => {
  return (
    <div className="Summary">
      <MDBContainer className="text-center mt-5 pt-5">
        <h2>Summary</h2>
        <MDBContainer className="mt-5">
          <MDBRow className="mt-4 text-center">
            <MDBCol md="12" className="mb-4">
              <MDBBtn size="lg" gradient="peach" rounded>
                <MDBIcon icon="plus" className="pr-2" /> New Order
              </MDBBtn>
              <MDBBtn size="lg" gradient="blue" rounded>
                <MDBIcon icon="beer" className="pr-2" /> Add Seybrews
              </MDBBtn>
              <MDBBtn size="lg" gradient="purple" rounded>
                <MDBIcon icon="user" className="pr-2" /> New Customer
              </MDBBtn>
            </MDBCol>
          </MDBRow>

          <MDBRow className="mt-4">
            <MDBCol md="4" className="mb-4">
              {/* Recent orders table */}
              <div className="w-responsive mx-auto p-3 mt-2">
                <h5>Recent orders</h5>
                <Link to="/orders">View All</Link>
              </div>
            </MDBCol>
            <MDBCol md="4" className="mb-4">
              {/* Active tabs table */}
              <div className="w-responsive mx-auto p-3 mt-2">
                <h5>Active tabs</h5>
                <Link to="/active">View All</Link>
              </div>
            </MDBCol>
            <MDBCol md="4" className="mb-4">
              {/* Overdue tabs table */}
              <div className="w-responsive mx-auto p-3 mt-2">
                <h5>Overdue tabs</h5>
                <Link to="/active">View All</Link>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </div>
  );
};

export default SummaryPage;
