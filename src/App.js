import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './components/login';
import Layout from './components/layout';
import RecoverPassword from './components/recover_pass/recover';
import RecuperatePassword from './components/recover_pass/recuperate';
import ManageUsers from './components/manage/users';
import ManageCustomers from './components/manage/customers';
import RegisterUser from './components/manage/users/register.jsx';
import EditUser from './components/manage/users/edit.jsx';
import ManageEquipment from './components/manage/customers/manageEquipment';
import AddEquipment from './components/manage/customers/addEquipment';
import EditEquipment from './components/manage/customers/editEquipment';
import CreateRequest from './components/ot_request/CreateRequest';
import Home from './components/home';
import OtRequest from './components/ot_request';
import ConfigureAccount from './components/configureAccount';
import NotFound from './components/layout_error/NotFound';
import ManageTechnicals from './components/manage/technicals';
import AllRequest from './components/ot_request/allRequests';
import CreateOT from './components/ot/createOT';
import ViewOT from './components/ot/ViewOT';



function App() {
  return (
    <Router>
      <Switch>
        
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/layout" component={Layout} />
        <Route exact path="/recover" component={RecoverPassword} />
        <Route path="/recuperate" component={RecuperatePassword} />
        <Route path="/createpassword" component={RecuperatePassword} />
        <Route path="/configureaccount" component={ConfigureAccount} />
        <Route exact path="/manage/users" component={ManageUsers} />
        <Route exact path="/manage/users/new" component={RegisterUser} />
        <Route exact path="/manage/users/edit/:id" component={EditUser} />
        <Route exact path="/manage/customers" component={ManageCustomers} />
        <Route exact path="/manage/technicals" component={ManageTechnicals} />
        {/* Equipment */}
        <Route exact path="/manage/equipment/add/:id" component={AddEquipment} />
        <Route exact path="/manage/equipment/edit/:id" component={EditEquipment} />
        <Route exact path="/manage/equipment/:id" component={ManageEquipment} />
        {/* OT Request */}
        <Route exact path="/otrequest/pending" component={AllRequest} />
        <Route exact path="/otrequest" component={OtRequest} />
        <Route exact path="/otrequest/create" component={CreateRequest} />
        {/* OT */}
        <Route exact path="/ot/create/:idrequest" component={CreateOT} />
        <Route exact path="/ot/view/:id" component={ViewOT} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
