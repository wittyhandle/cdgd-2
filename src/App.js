import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
	Dashboard,
	UserManagement,
	Main,
	Login,
	PrivateRoute,
	ThreePaned, ChangePassword
} from './components'
import { AuthenticationProvider } from './context/authentication.context';
import { ConfigContext as Provider } from './config/config';
import { authenticationService } from './services';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './fontawesome';

class App extends Component {
  render() {
    return (
        <div className={'wrapper'}>
          <Provider>
            <Router>
              <Switch>
                <Route path={'/'} component={Main} exact={true} />
                <AuthenticationProvider>
                  <Route path='/login' component={Login} exact={true} />
	
                  <PrivateRoute exact path={'/logout'} render={() => {
					  authenticationService.logout();
					  return <Redirect to={{ pathname: '/login'}} />
				  }}/>
                  
                  <PrivateRoute exact path={'/admin'} render={() => (
					<ThreePaned><Dashboard/></ThreePaned>
                  )}/>
                  <PrivateRoute exact path={'/user'} render={() => (
					<ThreePaned><UserManagement/></ThreePaned>
                  )}/>
                  <PrivateRoute exact path={'/change-password'} render={() => (
					  <ThreePaned><ChangePassword/></ThreePaned>
				  )}/>
                </AuthenticationProvider>
              </Switch>
            </Router>
          </Provider>
        </div>
    );
  }
}

export default App;
