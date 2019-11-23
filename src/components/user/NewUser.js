import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {userService} from '../../services';

import {Field, Submit} from '..';
import {Button} from 'react-bootstrap';
import {Modal} from '../';

import {passwordRules, newUserRules} from '../../utils/validations';

export const NewUser = ({newUserHandler}) => {
	
	const [showModal, setShowModal] = useState(false);
	
	const toggleNewUserForm = (reset) => {
        reset();
        setShowModal(!showModal);
    };
    
    const saveUser = (user, reset, setSubmitting, setFieldError) => {
	
		userService.createUser(user).then(r => {
		
			toggleNewUserForm(reset);
			user.id = r;
			newUserHandler(user);
		
		}).catch(e => {
			setFieldError('userName', e.message);
		}).finally(() => {
			setSubmitting(false);
		});
    };
    
    return (
        <div className={'row'}>
			
            <Formik
				validateOnBlur={false}
                validateOnChange={false}
                initialValues={{
					userName: '',
					email: '',
					firstName: '',
					lastName: '',
					password: '',
					password2: ''
				}}
                validationSchema={Yup.object().shape({...newUserRules, ...passwordRules })}
                //Handle userName validation here for async
                validate={values => {

                    if (values.userName) {
						let errors = {};

						return userService.isUnique(values.userName).then(isUnique => {
							if (isUnique) {
								return true;
							}
							errors.userName = 'Username must be unique';
						}).catch(() => {
							errors.userName = 'Server error, cannot determine uniqueness';
						}).finally(() => {
							if (Object.keys(errors).length) {
								throw errors;
							}
						});
					}
                }}
                onSubmit={(user, { setSubmitting, resetForm, setFieldError }) => {
                	saveUser(user, resetForm, setSubmitting, setFieldError);
                }}
            >
                {({ isSubmitting, resetForm }) => (
                	<>
						<div className={'col-lg-2'}>
							<Button className={'btn btn-info'} variant="primary" onClick={() => toggleNewUserForm(resetForm)} block>
								<i className={'nc-icon nc-simple-add'}/>
								New User
							</Button>
						</div>
		
						<Modal
							show={showModal}
							title={'New User'}
							handleClose={() => toggleNewUserForm(resetForm)}
							submitter={() => <Submit isSubmitting={isSubmitting} title={'Create'}/>}>
							
							<div className={'col-lg-12'}>
								<div className={'row'}>
									<div className={'col-lg-12 form-container'}>
										
											<div className={'row'}>
												<Field name={'userName'} label={'Username'} type={'text'} colCss={'col-lg-6'}/>
												<Field name={'email'} label={'Email'} type={'email'} colCss={'col-lg-6'}/>
											</div>
											<div className={'row'}>
												<Field name={'firstName'} label={'First Name'} type={'text'} colCss={'col-lg-6'}/>
												<Field name={'lastName'} label={'Last Name'} type={'text'}  colCss={'col-lg-6'}/>
											</div>
											
											<div className={'row'}>
												<Field name={'password'} label={'Password'} type={'password'} colCss={'col-lg-6'}/>
												<Field name={'password2'} label={'Confirm Password'} type={'password'} colCss={'col-lg-6'}/>
											</div>
									</div>
								</div>
							</div>
						</Modal>
					</>
                )}
            </Formik>
        </div>
    )
};

NewUser.propTypes = {
    newUserHandler: PropTypes.func
};
