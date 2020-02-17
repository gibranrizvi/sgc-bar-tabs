import React from 'react';
import { MDBContainer } from 'mdbreact';

import RegisterForm from '../../components/register-form/RegisterForm';
import FirebaseContext from '../../firebase/context';

const RegisterPage = ({ history }) => {
  const { currentUser } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    if (currentUser) {
      const { role } = currentUser;
      if (role === 'customer') {
        history.push('/');
      }
    } else {
      // TODO uncomment this
      // history.push('/sign-in');
    }
  }, [currentUser, history]);

  return (
    <div className="Register">
      <MDBContainer className="text-center mt-5 pt-5">
        <h2>Create New User</h2>
        <RegisterForm currentUser={currentUser} history={history} />
      </MDBContainer>
    </div>
  );
};

export default RegisterPage;
