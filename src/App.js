import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/Header';
import SignInPage from './pages/sign-in/SignInPage';
import SummaryPage from './pages/summary/SummaryPage';
import ActivePage from './pages/active/ActivePage';
import HistoryPage from './pages/history/HistoryPage';
import SeybrewPage from './pages/seybrew/SeybrewPage';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Route exact path="/sign-in" component={SignInPage} />
        <Route exact path="/" component={SummaryPage} />
        <Route exact path="/active" component={ActivePage} />
        <Route exact path="/history" component={HistoryPage} />
        <Route exact path="/seybrew" component={SeybrewPage} />
      </Router>
    </div>
  );
};

export default App;
