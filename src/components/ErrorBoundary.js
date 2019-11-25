import React, { Component } from "react";
import * as PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, errorInfo) {
    this.setState({
      error
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <div>
          <h2>{error && error.message}</h2>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
