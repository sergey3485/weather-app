import * as React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App/App';

import './design/global.css';
import './design/reset.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
