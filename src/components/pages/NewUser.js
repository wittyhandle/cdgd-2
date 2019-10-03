import React, { useState } from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { userService } from '../../services';

import {FeedbackPanel} from '../forms/FeedbackPanel';
import {Field} from '..';

export const NewUser = props => {

    const [isUserFormVisible, setUserFormVisible] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const specialCharacters = '!@#$%';
    const specialCharRegex = '^.*[' + specialCharacters + ']+.*$';
    const numberRegex = /^.*[0-9]+.*$/;
    const capitalRegex = /^.*[A-Z]+.*$/;

    const handleNewUserClick = (e) => {
        e && e.preventDefault();
        const isVisible = isUserFormVisible === '' ? 'visible' : '';
        setUserFormVisible(isVisible);
    };

    const saveUser = (user, reset) => {
        userService.createUser(user).then(r => {
            setShowSuccess(true);
            props.newUserHandler(user);

            setTimeout(() => {
                reset();
                setShowSuccess(false);
                handleNewUserClick();
            }, 2000);
            
        });
    };

    return (
        <div className={'row'}>
            <div className={'col-lg-2'}>
                <button className={'btn btn-info'} onClick={handleNewUserClick}>
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
                onSubmit={(user, { setSubmitting, resetForm }) => {
                    setSubmitting(false);
                    saveUser(user, resetForm);
                }}
            >
                {({ isSubmitting }) => (

                    <div className={'col-lg-10 new-user ' + isUserFormVisible}>

                        <div className={'row'}>
                            <div className={'col-lg-6 form-container'}>
                                <Form>
                                    <div className={'row'}>
                                        <Field name={'userName'} label={'Username'} type={'text'} colCss={'col-lg-6'}/>
                                        <Field name={'email'} label={'Email'} type={'email'} colCss={'col-lg-6'}/>
                                    </div>
                                    <div className={'row'}>
                                        <Field name={'firstName'} label={'First Name'} type={'text'} colCss={'col-lg-6'}/>
                                        <Field name={'lastName'} label={'Last Name'} type={'text'} colCss={'col-lg-6'}/>
                                    </div>

                                    <div className={'row'}>
                                        <Field name={'password'} label={'Password'} type={'password'} colCss={'col-lg-6'}/>
                                        <Field name={'password2'} label={'Confirm Password'} type={'password'} colCss={'col-lg-6'}/>
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
                                <FeedbackPanel
                                    showSuccess={showSuccess}
                                    successMessage={'Success - User created'}
                                    errors={['userName', 'email', 'firstName', 'lastName', 'password', 'password2']}/>
                            </div>
                        </div>
                    </div>
                )}

            </Formik>

        </div>
    )
};

NewUser.propTypes = {
    newUserHandler: PropTypes.func
};