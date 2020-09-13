import React from "react";
import { Field as FormikField } from "formik";
import * as PropTypes from "prop-types";
import ErrorMessage from "./ErrorMessage";

const Field = ({ colCss, name, label, type, value, disabled, options }) => {
  return (
    <div className={`cdgd-field ${colCss}`}>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <FormikField
          type={type}
          name={name}
          value={value}
          disabled={disabled}
          component={options ? "select" : "input"}
          className="form-control"
        >
          {options &&
            options.map(o => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
        </FormikField>
      </div>
      <ErrorMessage name={name} />
    </div>
  );
};

Field.defaultProps = {
  options: []
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
  colCss: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string
    })
  )
};

Field.defaultProps = {
  colCss: "",
  disabled: false
};

export default Field;
