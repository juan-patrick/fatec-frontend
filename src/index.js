import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { CssBaseline } from '@material-ui/core';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);