import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Main, PrivateRoute } from "./components/index";
import {
  Dashboard,
  UserManagement,
  Login,
  ChangePassword,
  ClientManagement
} from "./components/pages";
import { ThreePaned } from "./components/layouts";
import { AuthenticationProvider } from "./context/authentication.context";
import { ConfigContext as Provider } from "./config/config";
import { authenticationService } from "./utils";
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
                path="/client"
                render={() => (
                  <ThreePaned>
                    <ClientManagement />
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
