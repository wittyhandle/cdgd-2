import React from "react";
import * as PropTypes from "prop-types";
import { Modal as ReactModal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Form } from "formik";

const Modal = ({
  title,
  show,
  handleClose,
  handleAction,
  children,
  submitter,
  submitLabel
}) => {
  const renderSubmit = () =>
    submitter ? (
      submitter()
    ) : (
      <Button className="btn btn-info" variant="primary" onClick={handleAction}>
        {submitLabel}
      </Button>
    );

  return (
    <ReactModal
      show={show}
      onHide={handleClose}
      animation={false}
      backdrop="static"
    >
      <Form>
        <ReactModal.Header>
          <ReactModal.Title>{title}</ReactModal.Title>
        </ReactModal.Header>
        <ReactModal.Body>{children}</ReactModal.Body>
        <ReactModal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {renderSubmit()}
        </ReactModal.Footer>
      </Form>
    </ReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAction: PropTypes.func,
  submitter: PropTypes.func
};

Modal.defaultProps = {
  submitLabel: "Submit",
  handleAction: null,
  submitter: null
};

export default Modal;
