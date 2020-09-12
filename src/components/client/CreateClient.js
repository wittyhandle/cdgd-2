import React from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import * as PropTypes from "prop-types";
import { Modal, useModalToggle } from "../common";
import { createClientRules } from "../../utils";
import { Field, Submit } from "../forms";
import { clientService } from "../../services";
import { US_STATES } from "../common/constants";

const CreateClient = ({ createClientCallback }) => {
  const [{ show }, toggleModal] = useModalToggle();

  const saveClient = (client, reset, setSubmitting, setFieldError) => {
    clientService
      .createClient(client)
      .then(r => {
        toggleModal(reset);
        createClientCallback({ ...client, id: r });
      })
      .catch(e => {
        setFieldError("firstName", e.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="row">
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          addresses: []
        }}
        validationSchema={Yup.object().shape({
          ...createClientRules
        })}
        onSubmit={(client, { setSubmitting, resetForm, setFieldError }) => {
          saveClient(client, resetForm, setSubmitting, setFieldError);
        }}
      >
        {({ isSubmitting, resetForm, values }) => (
          <>
            <div className="col-lg-2">
              <Button
                className="btn btn-info"
                variant="primary"
                onClick={() => toggleModal(resetForm)}
                block
              >
                <i className="nc-icon nc-simple-add" />
                New Client
              </Button>
            </div>

            <Modal
              show={show}
              title="New Client"
              size="lg"
              handleClose={() => toggleModal(resetForm)}
              submitter={() => (
                <Submit isSubmitting={isSubmitting} title="Create" />
              )}
            >
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-12 form-container">
                    <div className="row">
                      <Field
                        name="email"
                        label="Email"
                        type="email"
                        colCss="col-lg-4"
                      />
                      <Field
                        name="firstName"
                        label="First Name"
                        type="text"
                        colCss="col-lg-4"
                      />
                      <Field
                        name="lastName"
                        label="Last Name"
                        type="text"
                        colCss="col-lg-4"
                      />
                    </div>
                    <fieldset className="form-group">
                      <legend>Addresses</legend>
                      <FieldArray
                        name="addresses"
                        render={arrayHelpers => (
                          <div>
                            <Button
                              className="no-hover"
                              variant="outline-info"
                              size="sm"
                              onClick={() => arrayHelpers.push({ id: -1 })}
                            >
                              <i className="nc-icon nc-simple-add" />
                            </Button>
                            <Button
                              className="no-hover"
                              variant="outline-info"
                              size="sm"
                              onClick={() => arrayHelpers.remove(0)}
                            >
                              <i className="nc-icon nc-simple-delete" />
                            </Button>
                            {values.addresses.map((address, index) => (
                              <div key={address.id}>
                                <div className="form-row">
                                  <Field
                                    name={`addresses[${index}].address`}
                                    label="Address"
                                    type="text"
                                    colCss="col-lg-12"
                                  />
                                </div>
                                <div className="form-row">
                                  <Field
                                    name={`addresses[${index}].address2`}
                                    label="Address 2"
                                    type="text"
                                    colCss="col-lg-12"
                                  />
                                </div>
                                <div className="form-row">
                                  <Field
                                    name={`addresses[${index}].city`}
                                    label="City"
                                    type="text"
                                    colCss="col-lg-5"
                                  />
                                  <Field
                                    name={`addresses[${index}].state`}
                                    label="State"
                                    type="text"
                                    colCss="col-lg-5"
                                    options={US_STATES}
                                  />
                                  <Field
                                    name={`addresses[${index}].zip`}
                                    label="Zip Code"
                                    type="text"
                                    colCss="col-lg-2"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    </fieldset>
                  </div>
                </div>
              </div>
            </Modal>
          </>
        )}
      </Formik>
    </div>
  );
};

CreateClient.propTypes = {
  createClientCallback: PropTypes.func.isRequired
};

export default CreateClient;
