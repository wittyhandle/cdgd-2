import React, {useEffect, useReducer} from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {userService} from '../../services';

import {FeedbackPanel} from '../forms/FeedbackPanel';
import {Field, Submit} from '..';
import {Button} from 'react-bootstrap';

import {passwordRules, newUserRules} from '../../utils/validations';

export const NewUser = ({newUserHandler, updateUserHandler, userToEdit}) => {
 
	const initialState = {
    	isFormVisible: false,
		successMessage: '',
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
					successMessage: action.message
				}
			}
			case 'retract_form': {
				return {
					...state,
					successMessage: '',
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
    
    const toggleNewUserForm = (reset) => {
        reset();
        dispatch({type: 'toggle_form'});
    };
    
    const renderPasswordFields = ({password, password2}) => {
    	return !state.isEditMode ?
			(<div className={'row'}>
				<Field name={'password'} label={'Password'} value={password} type={'password'} colCss={'col-lg-6'}/>
				<Field name={'password2'} label={'Confirm Password'} value={password2} type={'password'} colCss={'col-lg-6'}/>
			</div>) : ''
	};

    const saveUser = (user, reset, setSubmitting, setFieldError) => {
     
    	if (state.isEditMode) {
    		const {userName} = user;
    		userService.updateUser(userName, user).then(r => {
				dispatch({type: 'user_saved', message: 'User updated'});
				updateUserHandler(user);
				setTimeout(() => {
					dispatch({type: 'retract_form'});
				}, 2000);
			});
		} else {
			userService.createUser(user).then(r => {
				
				dispatch({type: 'user_saved', message: 'User created'});
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
			{...userToEdit, password: '', password2: ''} :
			{
				userName: '',
				email: '',
				firstName: '',
				lastName: '',
				password: '',
				password2: ''
			};
	};
    
    const getValidationRules = () => (
		state.isEditMode ?
			Yup.object().shape(newUserRules) :
			Yup.object().shape({...newUserRules, ...passwordRules })
	);

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

                    if (!state.isEditMode && values.userName) {
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
									<FeedbackPanel successMessage={state.successMessage} errors={errors} />
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
