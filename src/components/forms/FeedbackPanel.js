import React from 'react';
import PropTypes from 'prop-types';
import {ErrorMessage} from 'formik';

export const FeedbackPanel = props => {

    return (
        <div className={'feedback'}>

            {Object.keys(props.errors).map((i, idx) => (
                <ErrorMessage key={idx} name={i} component='div' className='alert alert-danger text-center fade show' />
            ))}

            <div className={'alert alert-success text-center fade ' + (props.showSuccess ? 'show' : 'hide')}>
                {props.successMessage}
            </div>
        </div>
    );
};

FeedbackPanel.propTypes = {
    errors: PropTypes.shape({}),
    showSuccess: PropTypes.bool,
    successMessage: PropTypes.string
};


