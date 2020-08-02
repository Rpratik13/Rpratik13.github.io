import React from 'react';
import ReactDOM from 'react-dom';

// Loading Components
import App from './App';
import * as serviceWorker from './serviceWorker';

// Loading CSS
import './index.css';
import './style.css';
import './layout.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
