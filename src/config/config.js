import React, { Component } from "react";
import * as PropTypes from "prop-types";

export const Context = React.createContext({ name: "test" });
export class ConfigContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "John",
      isLoggedIn: false,
      userInfo: {}
    };
  }

  logIn = data => {
    this.setState({ isLoggedIn: true, userInfo: data });
  };

  logOut = () => {
    this.setState({ isLoggedIn: false });
  };

  delete = () => {
    this.setState({ isLoggedIn: false, userInfo: {} });
  };

  changeName = () => {
    this.setState({ name: "Mike" });
  };

  render() {
    const { isLoggedIn, userInfo, name } = this.state;
    const { children } = this.props;

    return (
      <Context.Provider
        value={{
          name,
          isLoggedIn,
          userInfo,
          changeName: this.changeName,
          logIn: this.logIn,
          logOut: this.logOut,
          delete: this.delete
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

ConfigContext.propTypes = {
  children: PropTypes.node.isRequired
};
