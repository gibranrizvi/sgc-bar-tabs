import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignInPage from './pages/sign-in/SignInPage';
import SummaryPage from './pages/summary/SummaryPage';
import ActivePage from './pages/active/ActivePage';
import HistoryPage from './pages/history/HistoryPage';
import SeybrewPage from './pages/seybrew/SeybrewPage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  console.log(currentUser);

  useEffect(() => {
    let unsubscribeFromSnapshot;
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        unsubscribeFromSnapshot = userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(user);
      }
    });

    return () => {
      unsubscribeFromSnapshot();
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Header currentUser={currentUser} />
        <Switch>
          <Route
            exact
            path="/"
            component={SummaryPage}
            currentUser={currentUser}
          />
          <Route
            exact
            path="/sign-in"
            component={SignInPage}
            currentUser={currentUser}
          />
          <Route
            exact
            path="/active"
            component={ActivePage}
            currentUser={currentUser}
          />
          <Route
            exact
            path="/history"
            component={HistoryPage}
            currentUser={currentUser}
          />
          <Route
            exact
            path="/seybrew"
            component={SeybrewPage}
            currentUser={currentUser}
          />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
