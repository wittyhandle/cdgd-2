/* eslint-disable no-template-curly-in-string */
import React, {useEffect, useReducer} from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {userService} from '../../services';

import {FeedbackPanel} from '../forms/FeedbackPanel';
import {Field, Submit} from '..';
import {Button} from 'react-bootstrap';

export const NewUser = ({newUserHandler, updateUserHandler, userToEdit}) => {
    
    const initialState = {
    	isFormVisible: false,
		showSuccess: false,
		buttonLabel: 'New User',
		isEditMode: false
	};
    
    const reducer = (state, action) => {
    
    	switch (action.type) {
		
			case 'load_edit_form': {
				return {
					...state,
					isFormVisible: true,
					buttonLabel: 'Cancel',
					isEditMode: true
				}
			}
			case 'toggle_form': {
				return {
					...state,
					isFormVisible: !state.isFormVisible,
					buttonLabel: !state.isFormVisible ? 'Cancel' : 'New User',
					isEditMode: state.isFormVisible && state.isEditMode
				}
			}
			case 'user_saved': {
				return {
					...state,
					showSuccess: true
				}
			}
			case 'retract_form': {
				return {
					...state,
					showSuccess: false,
					isFormVisible: false,
					buttonLabel: 'New User'
				}
			}
			default: {
				return state;
			}
		}
	};
	
	const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
    	if (userToEdit.id && userToEdit.id !== '') {
			dispatch({type: 'load_edit_form'});
		}
	}, [userToEdit]);

    const specialCharacters = '!@#$%';
    const specialCharRegex = '^.*[' + specialCharacters + ']+.*$';
    const numberRegex = /^.*[0-9]+.*$/;
    const capitalRegex = /^.*[A-Z]+.*$/;

    const toggleNewUserForm = (reset) => {
        reset();
        dispatch({type: 'toggle_form'});
    };
    
    const renderPasswordFields = ({password, password2}) => {
    	return !state.isEditMode ?
			(<div className={'row'}>
				<Field name={'password'} label={'Password'} value={password} type={'password'} colCss={'col-lg-6'}/>
				<Field name={'password2'} label={'Confirm Password'} value={password2} type={'password'} colCss={'col-lg-6'}/>
			</div>) : '';
	};

    const saveUser = (user, reset, setSubmitting, setFieldError) => {
     
    	if (state.isEditMode) {
    		const {userName} = user;
    		userService.updateUser(userName, user).then(r => {
				dispatch({type: 'user_saved'});
				updateUserHandler(user);
				setTimeout(() => {
					reset();
					dispatch({type: 'retract_form'});
				}, 2000);
			});
		} else {
			userService.createUser(user).then(r => {
				dispatch({type: 'user_saved'});
			
				user.id = r;
				newUserHandler(user);
			
				setTimeout(() => {
					reset();
					dispatch({type: 'retract_form'});
				}, 2000);
			
			}).catch(e => {
				setFieldError('userName', e.message);
			}).finally(() => {
				setSubmitting(false);
			});
		}
    };
    
    const getInitialUser = () => {
    	return state.isEditMode ?
			userToEdit :
			{userName: '', email: '', firstName: '', lastName: '', password: '', password2: ''};
	};
    
    const getValidationRules = () => {
    	
    	const rules = {
			email: Yup.string()
				.required('Email is required')
				.email('Email is invalid'),
			firstName: Yup.string()
				.required('First name is required'),
			lastName: Yup.string()
				.required('Last name is required')
		};
    	
    	const passwordRules = {
			password: Yup.string()
				.required('Password is required')
				.min(8, 'Password must be at least ${min} characters long')
				.max(20, 'Password must be less than ${max} characters long')
				.test('password-chars', `Password must have at least one of ${specialCharacters}`, function (value) {
					return value && value.match(specialCharRegex);
				})
				.test( 'password-nums', 'Password must have at least one number', function (value) {
					return value && value.match(numberRegex);
				})
				.test( 'password-uppercase', 'Password must have at least one uppercase letter', function (value) {
					return value && value.match(capitalRegex);
				}),
			password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
		};
    	
    	return state.isEditMode ?
			Yup.object().shape(rules) :
			Yup.object().shape({...rules, ...passwordRules });
	};

    return (
        <div className={'row'}>
			
            <Formik
				enableReinitialize={true}
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={getInitialUser()}
                validationSchema={getValidationRules()}
                // Handle userName validation here for async
                validate={values => {

                    if (!state.isEditMode) {
						let errors = {};
	
						if (!values.userName) {
							errors.userName = 'Username is required';
							return errors;
						}
	
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
                {({ isSubmitting, errors, values, resetForm }) => (
                	<>
						<div className={'col-lg-2'}>
							<Button className={'btn btn-info'} variant="primary" onClick={() => toggleNewUserForm(resetForm)} block>
								<i className={'nc-icon nc-simple-add'}/>
								{state.buttonLabel}
							</Button>
						</div>
						
						<div className={'col-lg-10 new-user ' + (state.isFormVisible ? 'visible' : '')}>
							<div className={'row'}>
								<div className={'col-lg-6 form-container'}>
									<Form>
										<div className={'row'}>
											<Field name={'userName'} label={'Username'} value={values.userName} disabled={state.isEditMode} type={'text'} colCss={'col-lg-6'}/>
											<Field name={'email'} label={'Email'} type={'email'} value={values.email} colCss={'col-lg-6'}/>
										</div>
										<div className={'row'}>
											<Field name={'firstName'} label={'First Name'} value={values.firstName} type={'text'} colCss={'col-lg-6'}/>
											<Field name={'lastName'} label={'Last Name'} value={values.lastName} type={'text'}  colCss={'col-lg-6'}/>
										</div>
	
										{renderPasswordFields(values)}
										
										<div className={'row'}>
											<div className={'col-lg-3 ml-auto mr-auto'}>
												<Submit isSubmitting={isSubmitting} title={'Submit'}/>
											</div>
										</div>
									</Form>
								</div>
								<div className={'col-lg-3'}>
									<FeedbackPanel
										showSuccess={state.showSuccess}
										successMessage={'Success - User created'}
										errors={errors} />
								</div>
							</div>
						</div>
					</>
                )}
            </Formik>
        </div>
    )
};

NewUser.propTypes = {
    newUserHandler: PropTypes.func,
	updateUserHandler: PropTypes.func,
	userToEdit: PropTypes.shape({})
};
