import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { authenticationService } from "../utils";

const AuthenticationContext = React.createContext({});

export class AuthenticationProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: authenticationService.getUser()
    };
  }

  setCurrentUser = currentUser => {
    this.setState({ currentUser });
  };

  render() {
    const { children } = this.props;
    const { currentUser } = this.state;

    return (
      <AuthenticationContext.Provider
        value={{
          currentUser,
          setCurrentUser: this.setCurrentUser
        }}
      >
        {children}
      </AuthenticationContext.Provider>
    );
  }
}

AuthenticationProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthenticationConsumer = AuthenticationContext.Consumer;
