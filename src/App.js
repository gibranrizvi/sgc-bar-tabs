import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import { auth, firestore, FirebaseContext } from './firebase/firebase';
import useAuth from './hooks/useAuth';
import useCustomers from './hooks/useCustomers';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignInPage from './pages/sign-in/SignInPage';
import SummaryPage from './pages/summary/SummaryPage';
import CustomersPage from './pages/customers/CustomersPage';
import CustomerDetailPage from './pages/customer-detail/CustomerDetailPage';

const App = () => {
  const currentUser = useAuth();

  const customers = useCustomers();

  // console.log(currentUser);
  // console.log(customers);

  return (
    <FirebaseContext.Provider
      value={{ currentUser, customers, auth, firestore }}
    >
      <div className="App">
        <Router>
          <Header currentUser={currentUser} />
          <Switch>
            <Route exact path="/" component={SummaryPage} />
            <Route exact path="/sign-in" component={SignInPage} />
            <Route exact path="/customers" component={CustomersPage} />
            <Route
              exact
              path="/customer/:handle"
              component={CustomerDetailPage}
            />
          </Switch>
          <Footer />
        </Router>
      </div>
    </FirebaseContext.Provider>
  );
};

export default App;
