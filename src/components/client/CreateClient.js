import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { Modal, useModalToggle } from "../common";
import { createClientRules } from "../../utils";
import { Field, Submit } from "../forms";
import { clientService } from "../../services";

const CreateClient = () => {
  const [{ show }, toggleModal] = useModalToggle();

  const saveClient = (client, reset, setSubmitting, setFieldError) => {
    clientService
      .createClient(client)
      // eslint-disable-next-line no-unused-vars
      .then(r => {
        toggleModal(reset);
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
          lastName: ""
        }}
        validationSchema={Yup.object().shape({
          ...createClientRules
        })}
        onSubmit={(client, { setSubmitting, resetForm, setFieldError }) => {
          saveClient(client, resetForm, setSubmitting, setFieldError);
        }}
      >
        {({ isSubmitting, resetForm }) => (
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
              title="New User"
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
                        colCss="col-lg-6"
                      />
                    </div>
                    <div className="row">
                      <Field
                        name="firstName"
                        label="First Name"
                        type="text"
                        colCss="col-lg-6"
                      />
                      <Field
                        name="lastName"
                        label="Last Name"
                        type="text"
                        colCss="col-lg-6"
                      />
                    </div>
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

export default CreateClient;
