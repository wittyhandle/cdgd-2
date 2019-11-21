import React from 'react';
import PropTypes from 'prop-types';
import {Modal as ReactModal} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export const Modal = ({title, body, show, handleClose, handleAction}) => {
	return (
		<ReactModal show={show} onHide={handleClose} animation={false}>
			<ReactModal.Header>
				<ReactModal.Title>{title}</ReactModal.Title>
			</ReactModal.Header>
			<ReactModal.Body dangerouslySetInnerHTML={{__html: body}}/>
			<ReactModal.Footer>
				<Button variant="secondary" onClick={handleClose}>Close</Button>
				<Button className={'btn btn-info'} variant="primary" onClick={handleAction}>Delete</Button>
			</ReactModal.Footer>
		</ReactModal>
	)
};

Modal.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	show: PropTypes.bool,
	handleClose: PropTypes.func,
	handleAction: PropTypes.func
};
