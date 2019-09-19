import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { SinglePaned } from "./index";
import { authenticationService } from '../services/';
import { AuthenticationConsumer } from '../context/authentication.context';

class Login extends Component {

    doLogin = (values, setStatus, setCurrentUser) => {

        authenticationService.login(values.username, values.password)
            .then(
                user => {
                    this.props.history.push({pathname: '/admin'});
                    setCurrentUser(user);
                },
                error => {
                    setStatus({msg: error.message});
                }
            );
    };

    render() {
        return (
            <AuthenticationConsumer>
                {({ setCurrentUser }) => (
                    <SinglePaned pane={ (
                        <div className={'card'}>
                            <div className={'card-header'}>
                                <h5 className={'card-title'}>Sign-In</h5>
                            </div>
                            <div className={'card-body'}>
                                <Formik
                                    initialValues={{username: '', password: ''}}
                                    onSubmit={(values, { setSubmitting, setStatus }) => {
                                        setSubmitting(false);
                                        this.doLogin(values, setStatus, setCurrentUser);
                                    }}
                                >
                                    {({
                                        values,
                                        status,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting
                                    }) => (
                                        <Form>
                                            {status && status.msg &&
                                                <div className={'row'}>
                                                    <div className={'col-lg-12'}>
                                                        <div className={'alert alert-danger fade show'}>
                                                            {status.msg}
                                                        </div>
                                                    </div>
                                                </div>}

                                            <div className={'row'}>
                                                <div className={'col-lg-12 align-self-center'}>
                                                    <div className={'form-group'}>
                                                        <label htmlFor='username'>Username</label>
                                                        <Field type='text' name='username' className={'form-control'}/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={'row'}>
                                                <div className={'col-lg-12 align-self-center'}>
                                                    <div className={'form-group'}>
                                                        <label htmlFor='password'>Password</label>
                                                        <Field type='text' name='password' className={'form-control'}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'row'}>
                                                <div className={'ml-auto mr-auto'}>
                                                    <button
                                                        type='submit'
                                                        className={'btn btn-primary'}
                                                        disabled={isSubmitting}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    ) }/>
                )}
            </AuthenticationConsumer>
        );
    }
}

export default Login;