import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
