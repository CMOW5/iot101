import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// react router
import { BrowserRouter } from 'react-router-dom'

// styles
import 'bulma/css/bulma.css';
import "@fortawesome/fontawesome-free/css/all.css"

ReactDOM.render(
  <BrowserRouter
    // the forceRefresh config is set to stop firefox to prompt
    // the save password dialog
    forceRefresh = {true}
  >
    <App />
  </BrowserRouter>, 
  document.getElementById('root'));
registerServiceWorker();
