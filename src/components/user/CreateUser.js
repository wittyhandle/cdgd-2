import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { userService } from "../../services";
import { Field, Submit } from "../forms";
import { Modal, useModalToggle } from "../common";
import { passwordRules, createUserRules } from "../../utils/validations";

const CreateUser = ({ createUserCallback }) => {
  const [{ show }, toggleModal] = useModalToggle();

  const saveUser = (user, reset, setSubmitting, setFieldError) => {
    userService
      .createUser(user)
      .then(r => {
        toggleModal(reset);
        createUserCallback({ ...user, id: r });
      })
      .catch(e => {
        setFieldError("userName", e.message);
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
          userName: "",
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          password2: ""
        }}
        validationSchema={Yup.object().shape({
          ...createUserRules,
          ...passwordRules
        })}
        validate={values => {
          if (values.userName) {
            const errors = {};

            return userService
              .isUnique(values.userName)
              .then(isUnique => {
                if (isUnique) {
                  return true;
                }
                errors.userName = "Username must be unique";
                return false;
              })
              .catch(() => {
                errors.userName = "Server error, cannot determine uniqueness";
              })
              .finally(() => {
                if (Object.keys(errors).length) {
                  throw errors;
                }
              });
          }
          return false;
        }}
        onSubmit={(user, { setSubmitting, resetForm, setFieldError }) => {
          saveUser(user, resetForm, setSubmitting, setFieldError);
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
                New User
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
                        name="userName"
                        label="Username"
                        type="text"
                        colCss="col-lg-6"
                      />
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

                    <div className="row">
                      <Field
                        name="password"
                        label="Password"
                        type="password"
                        colCss="col-lg-6"
                      />
                      <Field
                        name="password2"
                        label="Confirm Password"
                        type="password"
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

CreateUser.propTypes = {
  createUserCallback: PropTypes.func.isRequired
};

export default CreateUser;
