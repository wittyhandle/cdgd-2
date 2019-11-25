import React from "react";
import * as PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { SinglePaned, Card, Field, Submit } from "../index";
import { authenticationService } from "../../services";
import { AuthenticationConsumer } from "../../context/authentication.context";

const Login = ({ history }) => {
  const doLogin = (values, setStatus, setSubmitting, setCurrentUser) => {
    setStatus({});
    authenticationService
      .login(values.username, values.password)
      .then(user => {
        setCurrentUser(user);
        history.push({ pathname: "/admin" });
      })
      .catch(e => {
        setStatus({ msg: e.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // noinspection RequiredAttributes
  return (
    <AuthenticationConsumer>
      {({ setCurrentUser }) => (
        <SinglePaned>
          {() => (
            <Card title="Sign-In">
              {() => (
                <Formik
                  initialValues={{ username: "", password: "" }}
                  onSubmit={(values, { setSubmitting, setStatus }) => {
                    doLogin(values, setStatus, setSubmitting, setCurrentUser);
                  }}
                >
                  {({ status, isSubmitting }) => (
                    <Form>
                      {status && status.msg && (
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="alert alert-danger fade show">
                              {status.msg}
                            </div>
                          </div>
                        </div>
                      )}
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
  history: PropTypes.node.isRequired
};

export default Login;
