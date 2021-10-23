import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/custom_bootstrap.css';
import './stylesheets/index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
