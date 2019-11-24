import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {userService} from '../../services';

import {Field, Submit} from '..';
import {Modal} from '../';
import {newUserRules} from '../../utils/validations';

export const EditUser = ({updateUserHandler, userToEdit, closeHandler}) => {
	
	const editUser = (user, reset, setSubmitting) => {
		
		const {userName} = user;
		userService.updateUser(userName, user).then(r => {
			reset();
			updateUserHandler(user);
		}).finally(() => {
			setSubmitting(false);
		});
	};
	
	return (
		<div className={'row'}>
			
			<Formik
				enableReinitialize={true}
				validateOnBlur={false}
				validateOnChange={false}
				initialValues={{...userToEdit}}
				validationSchema={Yup.object().shape({...newUserRules})}
				onSubmit={(user, { setSubmitting, resetForm }) => {
					editUser(user, resetForm, setSubmitting);
				}}
			>
				{({ isSubmitting, values }) => (
					<>
						<Modal
							show={!!userToEdit.id}
							title={'Edit User'}
							handleClose={() => closeHandler()}
							submitter={() => <Submit isSubmitting={isSubmitting} title={'Update'}/>}>
							
							<div className={'col-lg-12'}>
								<div className={'row'}>
									<div className={'col-lg-12 form-container'}>
										
										<div className={'row'}>
											<Field name={'userName'} label={'Username'} value={values.userName} type={'text'} colCss={'col-lg-6'} disabled/>
											<Field name={'email'} label={'Email'} type={'email'} value={values.email} colCss={'col-lg-6'}/>
										</div>
										<div className={'row'}>
											<Field name={'firstName'} label={'First Name'} value={values.firstName} type={'text'} colCss={'col-lg-6'}/>
											<Field name={'lastName'} label={'Last Name'} value={values.lastName} type={'text'}  colCss={'col-lg-6'}/>
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

EditUser.propTypes = {
	updateUserHandler: PropTypes.func,
	closeHandler: PropTypes.func,
	userToEdit: PropTypes.shape({})
};
