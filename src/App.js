import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {
  Dashboard,
  UserManagement,
  Main,
  Login,
  PrivateRoute,
  ThreePaned,
  ChangePassword
} from "./components/index";
import { AuthenticationProvider } from "./context/authentication.context";
import { ConfigContext as Provider } from "./config/config";
import { authenticationService } from "./services";
import "./fontawesome";

const App = () => {
  return (
    <div className="wrapper">
      <Provider>
        <Router>
          <Switch>
            <Route path="/" component={Main} exact />
            <AuthenticationProvider>
              <Route path="/login" component={Login} exact />
              <PrivateRoute
                exact
                path="/logout"
                render={() => {
                  authenticationService.logout();
                  return <Redirect to={{ pathname: "/login" }} />;
                }}
              />

              <PrivateRoute
                exact
                path="/admin"
                render={() => (
                  <ThreePaned>
                    <Dashboard />
                  </ThreePaned>
                )}
              />
              <PrivateRoute
                exact
                path="/user"
                render={() => (
                  <ThreePaned>
                    <UserManagement />
                  </ThreePaned>
                )}
              />
              <PrivateRoute
                exact
                path="/change-password"
                render={() => (
                  <ThreePaned>
                    <ChangePassword />
                  </ThreePaned>
                )}
              />
            </AuthenticationProvider>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
