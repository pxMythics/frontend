import { App } from 'app';
import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import { Router } from 'react-router-dom';
import { bootstrap } from 'service/bootstrap';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();
bootstrap();

ReactDOM.render(
  <React.StrictMode>
    <Router history={browserHistory}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
