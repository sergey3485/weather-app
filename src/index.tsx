import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { IndexPage } from './pages/IndexPage';
import { WeatherPage } from './pages/WeatherPage';

import './design/global.css';
import './design/reset.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <IndexPage />
        </Route>
        <Route path="/:city">
          <WeatherPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
