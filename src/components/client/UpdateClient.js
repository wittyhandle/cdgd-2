import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as PropTypes from "prop-types";
import { clientService } from "../../services";
import { Modal } from "../common";
import { createClientRules } from "../../utils";
import { Field, Submit } from "../forms";

const UpdateClient = ({ updateClientHandler, clientToEdit, closeHandler }) => {
  const updateClient = (client, reset, setSubmitting) => {
    const { id } = client;
    clientService
      .updateClient(id, client)
      .then(() => {
        reset();
        updateClientHandler(client);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="row">
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(client, { setSubmitting, resetForm }) => {
          updateClient(client, resetForm, setSubmitting);
        }}
        initialValues={{ ...clientToEdit }}
        validationSchema={Yup.object().shape({ ...createClientRules })}
      >
        {({ isSubmitting, values }) => (
          <Modal
            show={!!clientToEdit}
            title="Edit Client"
            handleClose={() => closeHandler()}
            submitter={() => (
              <Submit isSubmitting={isSubmitting} title="Update" />
            )}
          >
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12 form-container">
                  <div className="row">
                    <Field
                      name="email"
                      label="Email"
                      value={values.email}
                      type="email"
                      colCss="col-lg-6"
                    />
                  </div>
                  <div className="row">
                    <Field
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      type="text"
                      colCss="col-lg-6"
                    />
                    <Field
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      type="text"
                      colCss="col-lg-6"
                    />
                  </div>
                  <div className="row">
                    <Field
                      name="street1"
                      label="Street Address 1"
                      value={values.street1}
                      type="text"
                      colCss="col-lg-12"
                    />
                  </div>
                  <div className="row">
                    <Field
                      name="street2"
                      label="Street Address 2"
                      value={values.street2}
                      type="text"
                      colCss="col-lg-12"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </Formik>
    </div>
  );
};

UpdateClient.defaultProps = {
  clientToEdit: null
};

UpdateClient.propTypes = {
  updateClientHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  clientToEdit: PropTypes.shape({ id: PropTypes.number })
};

export default UpdateClient;
