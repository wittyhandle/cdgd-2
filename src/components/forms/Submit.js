import React from 'react';
import PropTypes from 'prop-types';
import {Spinner} from './Spinner';

export const Submit = props => {

    const spinner = props.isSubmitting ? <Spinner/> : '';

    return (
        <button
            type='submit'
            className={'btn btn-primary'}
            disabled={props.isSubmitting}
        >
            {props.title}
            {spinner}
        </button>
    )
};

Submit.propTypes = {
    isSubmitting: PropTypes.bool,
    title: PropTypes.string
};

