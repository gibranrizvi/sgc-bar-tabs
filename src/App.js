import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import { auth, firestore, FirebaseContext } from './firebase/firebase';
import useAuth from './hooks/useAuth';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignInPage from './pages/sign-in/SignInPage';
import SummaryPage from './pages/summary/SummaryPage';
import OrdersPage from './pages/orders/OrdersPage';
import ActivePage from './pages/active/ActivePage';
import SeybrewPage from './pages/seybrew/SeybrewPage';
import CustomersPage from './pages/customers/CustomersPage';
import RegisterPage from './pages/register/RegisterPage';

const App = () => {
  const currentUser = useAuth();

  console.log(currentUser);

  return (
    <FirebaseContext.Provider value={{ currentUser, auth, firestore }}>
      <div className="App">
        <Router>
          <Header currentUser={currentUser} />
          <Switch>
            <Route exact path="/" component={SummaryPage} />
            <Route exact path="/sign-in" component={SignInPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/orders" component={OrdersPage} />
            <Route exact path="/active" component={ActivePage} />
            <Route exact path="/seybrew" component={SeybrewPage} />
            <Route exact path="/customers" component={CustomersPage} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </FirebaseContext.Provider>
  );
};

export default App;
