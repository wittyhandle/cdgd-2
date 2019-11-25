import React from "react";
import * as PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Spinner } from "../index";

const Submit = ({ isSubmitting, title }) => {
  const spinner = isSubmitting ? <Spinner /> : "";

  return (
    <Button
      variant="primary"
      type="submit"
      className="btn btn-info"
      disabled={isSubmitting}
    >
      {title}
      {spinner}
    </Button>
  );
};

Submit.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Submit;
