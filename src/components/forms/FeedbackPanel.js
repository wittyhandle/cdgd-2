import React from "react";
import * as PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const FeedbackPanel = ({ errors, successMessage }) => {
  return (
    <div className="feedback">
      {Object.keys(errors).map(i => (
        <ErrorMessage
          key={i}
          name={i}
          component="div"
          className="alert alert-danger text-center"
        />
      ))}

      {successMessage && (
        <div className="alert alert-success text-center">
          Success - {successMessage}
        </div>
      )}
    </div>
  );
};

FeedbackPanel.propTypes = {
  errors: PropTypes.shape({}).isRequired,
  successMessage: PropTypes.string.isRequired
};

export default FeedbackPanel;
