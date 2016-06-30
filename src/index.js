import 'core-js/fn/object/assign';
import React from 'react';
import { Router, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes';

// Render the main component into the dom
ReactDOM.render(
  <Router history={hashHistory}>
    {routes}
  </Router>, 
  document.getElementById('app')
);
