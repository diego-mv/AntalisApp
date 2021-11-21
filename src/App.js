import React from 'react';
import Login from './components/login';
import Layout from './components/layout';
import RecoverPassword from './components/recover';
import ManageUsers from './components/manage/users';
import ManageCustomers from './components/manage/customers';
import RegisterUser from './components/manage/users/register.jsx';
import EditUser from './components/manage/users/edit.jsx';
import ManageEquipment from './components/manage/customers/manageEquipment';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import AddEquipment from './components/manage/customers/addEquipment';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/layout" component={Layout} />
        <Route exact path="/recover" component={RecoverPassword} />
        <Route exact path="/manage/users" component={ManageUsers} />
        <Route exact path="/manage/users/new" component={RegisterUser} />
        <Route exact path="/manage/users/edit/:id" component={EditUser} />
        <Route exact path="/manage/customers" component={ManageCustomers} />
        <Route exact path="/manage/equipment/add/:id" component={AddEquipment} />
        <Route exact path="/manage/equipment/:id" component={ManageEquipment} />
      </Switch>
    </Router>
  );
}

export default App;
