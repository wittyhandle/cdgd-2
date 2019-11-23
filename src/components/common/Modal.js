import React from 'react';
import PropTypes from 'prop-types';
import {Modal as ReactModal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Form} from 'formik';

export const Modal = ({title, children, show, handleClose, handleAction, submitter, submitLabel}) => {
	
	const renderSubmit = () => (
		submitter ? submitter() :
			<Button className={'btn btn-info'} variant="primary" onClick={handleAction}>{submitLabel}</Button>
	);
	
	return (
		<ReactModal dialogClassName={'modal-90w'} show={show} onHide={handleClose} animation={false} backdrop={'static'}>
			<Form>
				<ReactModal.Header>
					<ReactModal.Title>{title}</ReactModal.Title>
				</ReactModal.Header>
				<ReactModal.Body>
					{children}
				</ReactModal.Body>
				<ReactModal.Footer>
					<Button variant="secondary" onClick={handleClose}>Close</Button>
					{renderSubmit()}
				</ReactModal.Footer>
			</Form>
		</ReactModal>
	)
};

Modal.propTypes = {
	title: PropTypes.string,
	submitLabel: PropTypes.string,
	show: PropTypes.bool,
	handleClose: PropTypes.func,
	handleAction: PropTypes.func,
	submitter: PropTypes.func
};
