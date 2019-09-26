import React, { useState } from 'react';
import {Card} from "../Card";
import {Field, Form, Formik} from "formik";

export const User = () => {

    const [isUserFormVisible, setUserFormVisible] = useState('');

    const onNewUserClick = (e) => {
        console.log('new');
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
                                    initialValues={{username: ''}}
                                    onSubmit={(values, { setSubmitting, setStatus }) => {
                                        setSubmitting(false);
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
                                                                    <label htmlFor='username'>Username</label>
                                                                    <Field type='text' name='username' className={'form-control'}/>
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
                                                                    <label htmlFor='firstname'>First Name</label>
                                                                    <Field type='text' name='firstname' className={'form-control'}/>
                                                                </div>
                                                            </div>
                                                            <div className={'col-lg-6'}>
                                                                <div className={'form-group'}>
                                                                    <label htmlFor='lastname'>Last Name</label>
                                                                    <Field type='text' name='lastname' className={'form-control'}/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className={'row'}>
                                                            <div className={'col-lg-6'}>
                                                                <div className={'form-group'}>
                                                                    <label htmlFor='password1'>Password</label>
                                                                    <Field type='password' name='password1' className={'form-control'}/>
                                                                </div>
                                                            </div>
                                                            <div className={'col-lg-6'}>
                                                                <div className={'form-group'}>
                                                                    <label htmlFor='password2'>Confirm Password</label>
                                                                    <Field type='password' name='password2' className={'form-control'}/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </Form>
                                                </div>
                                                <div className={'col-lg-2'}>
                                                    Hello
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