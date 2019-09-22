import React, { Component } from 'react';
import {Admin, Main, Login, PrivateRoute} from './components'
import { AuthenticationProvider } from './context/authentication.context';
import { ConfigContext as Provider } from './config/config';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
class App extends Component {
  render() {
    return (
        <div className={'wrapper'}>
          <Provider>
            <Router>
              <Switch>
                <Route path='/' component={Main} exact={true} />
                <AuthenticationProvider>
                  <Route path='/login' component={Login} exact={true} />
                  <PrivateRoute exact path="/admin" component={Admin}/>
                </AuthenticationProvider>
              </Switch>
            </Router>
          </Provider>
        </div>
    );
  }
}

export default App;