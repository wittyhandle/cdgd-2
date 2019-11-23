import React from 'react';
import {ErrorMessage, Field as FormikField} from 'formik';
import PropTypes from 'prop-types';

export const Field = props => {
    return (
        <div className={`cdgd-field ${props.colCss}`}>
            <div className={'form-group'}>
                <label htmlFor={props.name}>{props.label}</label>
                <FormikField
					type={props.type}
					name={props.name}
					value={props.value}
					disabled={props.disabled}
					className={'form-control'}/>
            </div>
			<ErrorMessage name={props.name} component='div' className='error' />
        </div>
    )
};

Field.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
	value: PropTypes.string,
    colCss: PropTypes.string,
    disabled: PropTypes.bool
};

