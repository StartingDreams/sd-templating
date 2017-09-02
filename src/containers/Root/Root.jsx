import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { createStore } from '../../state';
import Header from '../../modules/Header';
import NoMatch from '../../components/NoMatch';
import Dashboard from '../../modules/Dashboard';

import './styles.css';

injectTapEventPlugin();
const store = createStore();

export default function Root() {
  return (
    <Provider store={store}>
      <div id="react-root">
        <div>
          <BrowserRouter>
            <div>
              <Header />
              <div className="main-body">
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/dashboard" exact component={Dashboard} />
                  <Route component={NoMatch}/>
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </div>
    </Provider>
  );
}
