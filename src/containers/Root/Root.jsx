import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Firebase from '../../modules/Firebase';
import { createStore } from '../../state';
import Header from '../../modules/Header';
import NoMatch from '../../components/NoMatch';
import PrivateRoute from '../../components/PrivateRoute';
import Editor from '../../modules/Editor';
import Dashboard from '../../modules/Dashboard';
import { Theme } from '../../styleguide';
import Sidebar from '../../components/Sidebar';
import './styles.css';

injectTapEventPlugin();
const store = createStore();

export default function Root() {
  return (
    <Provider store={store}>
      <div id="react-root">
        <MuiThemeProvider muiTheme={Theme}>
          <div>
            <BrowserRouter>
              <div>
                <Firebase />
                <Header />
                <Paper zDepth={1} style={{ margin: 0, padding: 0 }}>
                  <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <PrivateRoute path="/editor" exact component={Editor} />
                    <Route component={NoMatch}/>
                  </Switch>
                </Paper>
                <Sidebar />
              </div>
            </BrowserRouter>
          </div>
        </MuiThemeProvider>
      </div>
    </Provider>
  );
}
