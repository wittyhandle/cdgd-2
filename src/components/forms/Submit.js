import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Submit = props => {
    return (
        <button
            type='submit'
            className={'btn btn-primary'}
            disabled={props.isSubmitting}>
            {props.title}
            <FontAwesomeIcon className={'loader ' + (props.isSubmitting ? 'show' : '') } icon={'spinner'} spin />
        </button>
    )
};

Submit.propTypes = {
    isSubmitting: PropTypes.bool,
    title: PropTypes.string
};

