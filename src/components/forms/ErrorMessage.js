import React from "react";
import { Field, getIn } from "formik";
import * as PropTypes from "prop-types";

const ErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      return (
        (error && typeof error === "string" && (
          <div className="error">{error}</div>
        )) ||
        null
      );
    }}
  />
);

ErrorMessage.propTypes = {
  name: PropTypes.string.isRequired
};

export default ErrorMessage;
