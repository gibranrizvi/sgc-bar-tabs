import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';

import './summary-page.css';

const SummaryPage = ({ currentUser, history }) => {
  return (
    <div className="Summary">
      <MDBContainer className="text-center mt-5 pt-5">
        <h2>Summary</h2>
        <MDBContainer className="mt-5">
          <MDBRow className="mt-4 text-center">
            <MDBCol md="8" className="mb-4"></MDBCol>
            <MDBCol md="4" className="mb-4">
              <MDBBtn size="lg" gradient="purple" rounded>
                <MDBIcon icon="plus" /> New Order
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </div>
  );
};

export default SummaryPage;
