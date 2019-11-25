import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { AuthenticationConsumer } from "../../context/authentication.context";
import { Card, Field, Submit, FeedbackPanel } from "../index";
import { passwordRules } from "../../utils/validations";
import { userService } from "../../services";

const ChangePassword = () => {
  const [success, setSuccess] = useState("");

  const getValidationRules = () =>
    Yup.object().shape({
      oldPassword: Yup.string().required("Old password is required"),
      ...passwordRules
    });

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
                      <div className="row">
                        <div className="ml-auto mr-auto">
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

export default ChangePassword;
