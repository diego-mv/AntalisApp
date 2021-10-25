import React from 'react';
import Login from './components/login';
import Layout from './components/layout';
import Loading from './components/loading';

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
        <Route exact path="/" component={Login} />
        <Route exact path="/layout" component={Layout} />
        <Route exact path="/loading" component={Loading} />
      </Switch>
    </Router>
  );
}

export default App;
