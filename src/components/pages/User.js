import React, { useState } from 'react';
import {Card} from "../Card";
import {Form, Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';
import { userService } from '../../services';
import {Field} from "..";

export const User = () => {

    const [isUserFormVisible, setUserFormVisible] = useState('');
    const [isSuccess, setSuccess] = useState('hide');

    const specialCharacters = '!@#$%';
    const specialCharRegex = '^.*[' + specialCharacters + ']+.*$';
    const numberRegex = /^.*[0-9]+.*$/;
    const capitalRegex = /^.*[A-Z]+.*$/;

    const onNewUserClick = (e) => {
        e.preventDefault();
        const isVisible = isUserFormVisible === '' ? 'visible' : '';
        setUserFormVisible(isVisible);
    };

    const saveUser = user => {
        userService.createUser(user).then(r => {
            setSuccess('show');
        });
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
                                    validateOnBlur={false}
                                    validateOnChange={false}
                                    initialValues={{userName: '', email: '', firstName: '', lastName: '', password: '', password2: ''}}
                                    validationSchema={Yup.object().shape({
                                        userName: Yup.string()
                                            .required('Username is required')
                                            .test('unique-username', 'Username must be unique', function(value) {
                                                return userService.isUnique(value);
                                            }),
                                        email: Yup.string()
                                            .required('Email is required')
                                            .email('Email is invalid'),
                                        firstName: Yup.string()
                                            .required('First name is required'),
                                        lastName: Yup.string()
                                            .required('Last name is required'),
                                        password: Yup.string()
                                            .required('Password is required')
                                            .min(8, 'Password must be at least ${min} characters long')
                                            .max(20, 'Password must be less than ${max} characters long')
                                            .test('password-chars', 'Password must have at least one of ' + specialCharacters, function (value) {
                                                return value && value.match(specialCharRegex);
                                            })
                                            .test( 'password-nums', 'Password must have at least one number', function (value) {
                                                return value && value.match(numberRegex);
                                            })
                                            .test( 'password-uppercase', 'Password must have at least one uppercase letter', function (value) {
                                                return value && value.match(capitalRegex);
                                            }),
                                        password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
                                    })}
                                    onSubmit={(user, { setSubmitting, setStatus }) => {
                                        setSubmitting(false);
                                        saveUser(user);
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
                                                                <Field name={'userName'} label={'Username'} type={'text'}/>
                                                            </div>
                                                            <div className={'col-lg-6'}>
                                                                <Field name={'email'} label={'Email'} type={'email'}/>
                                                            </div>
                                                        </div>
                                                        <div className={'row'}>
                                                            <div className={'col-lg-6'}>
                                                                <Field name={'firstName'} label={'First Name'} type={'text'}/>
                                                            </div>
                                                            <div className={'col-lg-6'}>
                                                                <Field name={'lastName'} label={'Last Name'} type={'text'}/>
                                                            </div>
                                                        </div>

                                                        <div className={'row'}>
                                                            <div className={'col-lg-6'}>
                                                                <Field name={'password'} label={'Password'} type={'password'}/>
                                                            </div>
                                                            <div className={'col-lg-6'}>
                                                                <Field name={'password2'} label={'Confirm Password'} type={'password'}/>
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
                                                    <div className={'alert alert-success text-center fade ' + isSuccess}>Success - User created</div>
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