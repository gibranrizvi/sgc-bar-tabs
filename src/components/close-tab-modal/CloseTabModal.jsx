import React from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';

import { closeTab, FirebaseContext } from '../../firebase/firebase';

const CloseTabModal = ({ selectedCustomer, buttonType, activeTab }) => {
  const { currentUser } = React.useContext(FirebaseContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const toggle = () => {
    return setModalOpen(prev => !prev);
  };

  const onConfirm = async () => {
    setSubmitting(true);

    try {
      await closeTab(selectedCustomer, activeTab, currentUser);

      setSubmitting(false);
      return toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {buttonType === 'icon' ? (
        <MDBIcon className="pointer" icon="times" onClick={toggle} />
      ) : (
        <MDBBtn gradient="peach" className="px-3 py-2" rounded onClick={toggle}>
          <MDBIcon icon="times" className="pr-1" /> Close
        </MDBBtn>
      )}
      <MDBModal isOpen={modalOpen} toggle={toggle} side position="top-right">
        <MDBModalHeader toggle={toggle}>Are you sure?</MDBModalHeader>
        <MDBModalBody>
          By closing this tab, you confirm that{' '}
          <strong>{selectedCustomer.displayName}</strong> has settled a tab of{' '}
          <strong>SR {activeTab.tabAmount}.00</strong>. This action cannot be
          reversed.
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn gradient="peach" onClick={toggle}>
            Cancel
          </MDBBtn>
          <MDBBtn onClick={onConfirm} gradient="blue">
            {submitting ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Submitting...</span>
              </div>
            ) : (
              'Confirm'
            )}
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};

export default CloseTabModal;
