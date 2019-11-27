import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";

import { AuthenticationConsumer } from "../../context/authentication.context";
import { Card } from "../index";
import { Field, Submit, FeedbackPanel } from "../forms";
import { passwordRules } from "../../utils/validations";
import { userService } from "../../services";

const ChangePasswordWrapped = ({ history }) => {
  const [success, setSuccess] = useState("");

  const getValidationRules = () =>
    Yup.object().shape({
      oldPassword: Yup.string().required("Old password is required"),
      ...passwordRules
    });

  const handleCancel = () => {
    history.goBack();
  };

  // noinspection RequiredAttributes
  return (
    <div className="row">
      <div className="col-lg-4 mx-auto">
        <AuthenticationConsumer>
          {({ currentUser }) => (
            <Card title="Change Password">
              {() => (
                <Formik
                  validateOnBlur={false}
                  validateOnChange={false}
                  initialValues={{
                    oldPassword: "",
                    password: "",
                    password2: ""
                  }}
                  validationSchema={getValidationRules()}
                  onSubmit={(values, { setFieldError }) => {
                    userService
                      .changePassword(
                        currentUser.userName,
                        values.oldPassword,
                        values.password
                      )
                      .then(res => {
                        if (res.success) {
                          setSuccess("Password updated");
                          setTimeout(() => {
                            history.goBack();
                          }, 2000);
                        } else {
                          setFieldError("oldPassword", res.message);
                        }
                      });
                  }}
                >
                  {({ errors, isSubmitting }) => (
                    <Form>
                      <div className="row">
                        <div className="col-lg-12">
                          <FeedbackPanel
                            successMessage={success}
                            errors={errors}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <Field
                          name="oldPassword"
                          label="Old Password"
                          type="password"
                          colCss="col-lg-12 align-self-center"
                        />
                      </div>
                      <div className="row">
                        <Field
                          name="password"
                          label="Password"
                          type="password"
                          colCss="col-lg-12 align-self-center"
                        />
                      </div>
                      <div className="row">
                        <Field
                          name="password2"
                          label="Confirm Password"
                          type="password"
                          colCss="col-lg-12 align-self-center"
                        />
                      </div>
                      <div className="row justify-content-md-center">
                        <div className="col-lg-3">
                          <button
                            onClick={handleCancel}
                            type="button"
                            className="btn btn-default"
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="col-lg-3">
                          <Submit isSubmitting={isSubmitting} title="Submit" />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </Card>
          )}
        </AuthenticationConsumer>
      </div>
    </div>
  );
};

ChangePasswordWrapped.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

const ChangePassword = withRouter(ChangePasswordWrapped);
export default ChangePassword;
