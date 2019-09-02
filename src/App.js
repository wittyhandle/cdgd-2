import React, { Component } from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import { ConfigContext as Provider } from "./config/config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
        <div className={'container d-flex h-100'}>
          <Provider>
            <Router>
              <Switch>
                <Route path="/" component={Main} exact={true} />
                <Route path="/login" component={Login} exact={true} />
              </Switch>
            </Router>
          </Provider>
        </div>
    );
  }
}

export default App;