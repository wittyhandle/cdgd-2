import React from "react";
import * as PropTypes from "prop-types";

const SuccessPanel = ({ successMessage }) => {
  return (
    <div className="feedback">
      {successMessage && (
        <div className="alert alert-success text-center">
          Success - {successMessage}
        </div>
      )}
    </div>
  );
};

SuccessPanel.propTypes = {
  successMessage: PropTypes.string.isRequired
};

export default SuccessPanel;
