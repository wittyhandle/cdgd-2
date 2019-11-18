import React, {useState} from 'react';
import { AuthenticationConsumer } from '../../context/authentication.context';
import {Card} from '../Card';
import {Form, Formik} from 'formik';
import {Field, Submit} from '..';
import {passwordRules} from '../../utils/validations';
import * as Yup from 'yup';
import {FeedbackPanel} from '../forms/FeedbackPanel';
import {userService} from '../../services/';

export const ChangePassword = () => {
	
	const [success, setSuccess] = useState('');
	
	const getValidationRules = () => (
		Yup.object().shape(
			{oldPassword: Yup.string().required('Old password is required'),
			...passwordRules })
	);
	
	return (
		<div className={'row'}>
			<div className={'col-lg-4 mx-auto'}>
				<AuthenticationConsumer>
					{({ currentUser }) => (
						
						<Card title={'Change Password'}>
							{() => (
								<Formik
									validateOnBlur={false}
									validateOnChange={false}
									initialValues={{oldPassword: '', password: '', password2: ''}}
									validationSchema={getValidationRules()}
									onSubmit={(values, { setFieldError }) => {
										userService.changePassword(currentUser.userName, values.oldPassword, values.password)
											.then(res => {
												if (res.success) {
													setSuccess('Password updated');
												} else {
													setFieldError('oldPassword', res.message);
												}
											});
									}}
								>
									{({errors, isSubmitting}) => (
										<Form>
											
											<div className={'row'}>
												<div className={'col-lg-12'}>
													<FeedbackPanel
														successMessage={success}
														errors={errors} />
												</div>
											</div>
											
											<div className={'row'}>
												<Field name={'oldPassword'} label={'Old Password'} type={'password'} colCss={'col-lg-12 align-self-center'}/>
											</div>
											
											<div className={'row'}>
												<Field name={'password'} label={'Password'} type={'password'} colCss={'col-lg-12 align-self-center'}/>
											</div>
											
											<div className={'row'}>
												<Field name={'password2'} label={'Confirm Password'} type={'password'} colCss={'col-lg-12 align-self-center'}/>
											</div>
											
											<div className={'row'}>
												<div className={'ml-auto mr-auto'}>
													<Submit isSubmitting={isSubmitting} title={'Submit'}/>
												</div>
											</div>
										</Form>
									)}
								</Formik>
							)}
						</Card>
					)}
				</AuthenticationConsumer>
			</div>
		</div>
	)
};
