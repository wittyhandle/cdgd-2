import React, { useState } from 'react';
import {Card} from "../Card";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';

export const User = () => {

    const [isUserFormVisible, setUserFormVisible] = useState('');

    const specialCharacters = '!@#$%';
    const specialCharRegex = '^.*[' + specialCharacters + ']+.*$';
    const numberRegex = /^.*[0-9]+.*$/;
    const capitalRegex = /^.*[A-Z]+.*$/;

    const onNewUserClick = (e) => {
        e.preventDefault();
        const isVisible = isUserFormVisible === '' ? 'visible' : '';
        setUserFormVisible(isVisible);
    };


    return (
        <div className={'row'}>
            <div className={'col-lg-12'}>
                <Card title={'User Management'}>
                    {() => (
                        <div>
                            <div className={'row'}>
                                <div className={'col-lg-2'}>
                                    <button className={'btn btn-info'} onClick={onNewUserClick}>
                                        <i className={'nc-icon nc-simple-add'}/>
                                        New User
                                    </button>
                                </div>

                                <Formik
                                    validateOnBlur={true}
                                    validateOnChange={true}
                                    initialValues={{userName: '', email: '', firstName: '', lastName: '', password: ''}}
                                    validationSchema={Yup.object().shape({
                                        userName: Yup.string().required('Username is required'),
                                        email: Yup.string()
                                            .required('Email is required')
                                            .email('Email is invalid'),
                                        firstName: Yup.string().required('First name is required'),
                                        lastName: Yup.string().required('Last name is required'),
                                        password: Yup.string()
                                            .required('Password is required')
                                            .min(8, 'Password must be at least ${min} characters long')
                                            .max(20, 'Password must be less than ${max} characters long')
                                            .test('password-chars', 'Password must have at least one of ' + specialCharacters, function (value) {
                                                return value.match(specialCharRegex);
                                            })
                                            .test( 'password-nums', 'Password must have at least one number', function (value) {
                                                return value.match(numberRegex);
                                            })
                                            .test( 'password-uppercase', 'Password must have at least one uppercase letter', function (value) {
                                                return value.match(capitalRegex);
                                            }),
                                        password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
                                    })}
                                    onSubmit={(values, { setSubmitting, setStatus }) => {
                                        setSubmitting(false);
                                        console.log('submitting', values);
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

                                        <div className={'col-lg-10 new-user ' + isUserFormVisible}>

                                            <div className={'row'}>
                                                <div className={'col-lg-6 form-container'}>
                                                    <Form>
                                                        <div className={'row'}>
                                                            <div className={'col-lg-6'}>
                                                                <div className={'form-group'}>
                                                                    <label htmlFor='userName'>Username</label>
                                                                    <Field type='text' name='userName' className={'form-control'}/>
                                                                </div>
                                                            </div>
                                                            <div className={'col-lg-6'}>
                                                                <div className={'form-group'}>
                                                                    <label htmlFor='email'>Email</label>
                                                                    <Field type='email' name='email' className={'form-control'}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={'row'}>
                                                            <div className={'col-lg-6'}>
                                                                <div className={'form-group'}>
                                                                    <label htmlFor='firstName'>First Name</label>
                                                                    <Field type='text' name='firstName' className={'form-control'}/>
                                                                </div>
                                                            </div>
                                                            <div className={'col-lg-6'}>
                                                                <div className={'form-group'}>
                                                                    <label htmlFor='lastName'>Last Name</label>
                                                                    <Field type='text' name='lastName' className={'form-control'}/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className={'row'}>
                                                            <div className={'col-lg-6'}>
                                                                <div className={'form-group'}>
                                                                    <label htmlFor='password'>Password</label>
                                                                    <Field type='password' name='password' className={'form-control'}/>
                                                                </div>
                                                            </div>
                                                            <div className={'col-lg-6'}>
                                                                <div className={'form-group'}>
                                                                    <label htmlFor='password2'>Confirm Password</label>
                                                                    <Field type='password' name='password2' className={'form-control'}/>
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
                                                </div>
                                                <div className={'col-lg-3'}>
                                                    <ErrorMessage name='userName' component='div' className='alert alert-danger text-center fade show' />
                                                    <ErrorMessage name='email' component='div' className='alert alert-danger text-center fade show' />
                                                    <ErrorMessage name='firstName' component='div' className='alert alert-danger text-center fade show' />
                                                    <ErrorMessage name='lastName' component='div' className='alert alert-danger text-center fade show' />
                                                    <ErrorMessage name='password' component='div' className='alert alert-danger text-center fade show' />

                                                    <ErrorMessage name='password2' component='div' className='alert alert-danger text-center fade show' />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </Formik>

                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
};