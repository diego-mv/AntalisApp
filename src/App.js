import React from 'react';
import LoginPage from './components/login';
import Layout from './components/layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/layout" component={Layout} />
      </Switch>
    </Router>
  );
}

export default App;
