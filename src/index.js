import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Components/Layout';
import './reset.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Layout />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
