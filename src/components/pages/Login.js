import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import {SinglePaned, Card, Field, Submit} from '..';
import { authenticationService } from '../../services';
import { AuthenticationConsumer } from '../../context/authentication.context';

class Login extends Component {

    doLogin = (values, setStatus, setSubmitting, setCurrentUser) => {

        authenticationService.login(values.username, values.password)
            .then(
                user => {
                    setSubmitting(false);
                    setCurrentUser(user);
                    this.props.history.push({pathname: '/admin'});
                },
                error => {
                    setSubmitting(false);
                    setStatus({msg: error.message});
                }
            );
    };

    render() {
        return (
            <AuthenticationConsumer>
                {({ setCurrentUser }) => (
                    <SinglePaned>
                        {() => (
                            <Card title={'Sign-In'}>
                                {() => (
                                    <Formik
                                        initialValues={{username: '', password: ''}}
                                        onSubmit={(values, { setSubmitting, setStatus }) => {
                                            this.doLogin(values, setStatus, setSubmitting, setCurrentUser);
                                        }}
                                    >
                                        {({
                                            status,
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
                                                    <Field name={'username'} label={'Username'} type={'text'} colCss={'col-lg-12 align-self-center'}/>
                                                </div>

                                                <div className={'row'}>
                                                    <Field name={'password'} label={'Password'} type={'password'} colCss={'col-lg-12 align-self-center'}/>
                                                </div>
                                                <div className={'row'}>
                                                    <div className={'ml-auto mr-auto'}>
                                                        <Submit isSubmitting={isSubmitting} title={'Log In'}/>
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
    }
}

export default Login;