import React from 'react';
import PropTypes from 'prop-types';
import {Spinner} from './Spinner';
import {Button} from 'react-bootstrap';

export const Submit = props => {

    const spinner = props.isSubmitting ? <Spinner/> : '';

    return (
		<Button
			variant={'primary'}
			type={'submit'}
			className={'btn btn-info'}
			disabled={props.isSubmitting}>
			{props.title}
			{spinner}
		</Button>
    )
};

Submit.propTypes = {
    isSubmitting: PropTypes.bool,
    title: PropTypes.string
};

