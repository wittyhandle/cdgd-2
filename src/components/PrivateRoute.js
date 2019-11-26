import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as PropTypes from "prop-types";
import { authenticationService } from "../utils";

const PrivateRoute = ({ render, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const userToken = authenticationService.getUserToken();
      if (!userToken) {
        return <Redirect to={{ pathname: "/login" }} />;
      }

      return render({ ...props });
    }}
  />
);

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired
};

export default PrivateRoute;
