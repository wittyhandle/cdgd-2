import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { authenticationService } from '../services/';
import { AuthenticationConsumer } from '../context/authentication.context';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    doLogin = (values, setStatus, setCurrentUser) => {

        setStatus('something');
        authenticationService.login(values.username, values.password)
            .then(
                user => {
                    this.props.history.push({pathname: '/admin'});
                    setCurrentUser(user);
                },
                error => {
                    console.log(error);
                    setStatus({msg: error.message});
                }
            );
    };

    render() {
        return (
            <AuthenticationConsumer>
                {({ currentUser, setCurrentUser }) => (
                    <div className={'row align-self-center w-100'}>
                        <div className={'col'}>

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
                                    <Form className={'mx-auto w-50 p-3'}>
                                        <div className={'form-group'}>

                                            {status && status.msg && <div>{status.msg}</div>}

                                            <div className={'cdgd-field'}>
                                                <label htmlFor='username'>Username</label>
                                                <Field type='text' name='username' className={'form-control'}/>
                                            </div>

                                            <div className={'cdgd-field'}>
                                                <label htmlFor='password'>Password</label>
                                                <Field type='password' name='password' className={'form-control'}/>
                                            </div>

                                            <div className={'cdgd-button'}>
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
                )}
            </AuthenticationConsumer>
        );
    }
}

export default Login;