import React from 'react';
import {Field as FormikField} from 'formik';
import PropTypes from "prop-types";

export const Field = props => {
    return (
        <div className={'form-group'}>
            <label htmlFor={props.name}>{props.label}</label>
            <FormikField type={props.type} name={props.name} className={'form-control'}/>
        </div>
    )
};

Field.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string
};

