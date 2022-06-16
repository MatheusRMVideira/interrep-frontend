import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'

import Login from './views/Login/'

import ProtectedRoute from './components/ProtectedRoute'

import * as CONFIG from './config'

axios.defaults.baseURL = CONFIG.SERVER_URL;

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login}/>
      <ProtectedRoute path="/" component={Full}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));
