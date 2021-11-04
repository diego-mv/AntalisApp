import React from 'react';
import Login from './components/login';
import Layout from './components/layout';
import RecoverPassword from './components/recover';
import ManageUsers from './components/manage/users';
import RegisterUser from './components/manage/users/register';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/layout" component={Layout} />
        <Route exact path="/recover" component={RecoverPassword} />
        <Route exact path="/manage/users" component={ManageUsers} />
        <Route exact path="/manage/users/new" component={RegisterUser} />
      </Switch>
    </Router>
  );
}

export default App;
