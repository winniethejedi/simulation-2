import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators} from 'redux';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Wizard from './Components/Wizard/Wizard';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path={`/dashboard`} component={ Dashboard }/>
            <Route path={`/wizard/:id`} component={ Wizard }/>
            <Route path={`/`} component={ Login }/>
          </Switch>
        </Router>
    );
  }
}

export default App;
