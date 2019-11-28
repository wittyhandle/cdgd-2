import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Formik, Form } from "formik";
import { Card } from "../index";
import { SinglePaned } from "../layouts";
import { Field, Submit } from "../forms";
import { userService } from "../../services";
import { AuthenticationConsumer } from "../../context/authentication.context";

const Login = ({ history }) => {
  const doLogin = (values, setSubmitting, setCurrentUser, setFieldError) => {
    userService
      .login(values.username, values.password)
      .then(user => {
        setCurrentUser(user);
        history.push({ pathname: "/admin" });
      })
      .catch(e => {
        setFieldError("username", e.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <AuthenticationConsumer>
      {({ setCurrentUser }) => (
        <SinglePaned>
          {() => (
            <Card title="Sign-In">
              {() => (
                <Formik
                  initialValues={{ username: "", password: "" }}
                  onSubmit={(values, { setSubmitting, setFieldError }) => {
                    doLogin(
                      values,
                      setSubmitting,
                      setCurrentUser,
                      setFieldError
                    );
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="row">
                        <Field
                          name="username"
                          label="Username"
                          type="text"
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
                        <div className="ml-auto mr-auto">
                          <Submit isSubmitting={isSubmitting} title="Log In" />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </Card>
          )}
        </SinglePaned>
      )}
    </AuthenticationConsumer>
  );
};

Login.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

export default Login;
