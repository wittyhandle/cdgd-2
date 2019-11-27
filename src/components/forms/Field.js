import React from "react";
import { ErrorMessage, Field as FormikField } from "formik";
import * as PropTypes from "prop-types";

const Field = ({ colCss, name, label, type, value, disabled }) => {
  return (
    <div className={`cdgd-field ${colCss}`}>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <FormikField
          type={type}
          name={name}
          value={value}
          disabled={disabled}
          className="form-control"
        />
      </div>
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
  colCss: PropTypes.string,
  disabled: PropTypes.bool
};

Field.defaultProps = {
  colCss: "",
  disabled: false
};

export default Field;
