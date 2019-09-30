import React from 'react';
import PropTypes from 'prop-types';
import {ErrorMessage} from 'formik';

const cssClassesByProp = show => {

    const baseClasses = 'alert alert-success text-center fade ';
    return show ? baseClasses + 'show' : baseClasses + 'hide';
};

export const FeedbackPanel = props => {

    return (
        <div>
            {props.errors.map((i, index) => (
                <ErrorMessage key={index} name={i} component='div' className='alert alert-danger text-center fade show' />
            ))}
            <div className={cssClassesByProp(props.showSuccess)}>
                {props.successMessage}
            </div>
        </div>
    );
};

FeedbackPanel.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string),
    showSuccess: PropTypes.bool,
    successMessage: PropTypes.string
};