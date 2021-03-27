import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from './pages/LandingPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/register">
          <Register />
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
