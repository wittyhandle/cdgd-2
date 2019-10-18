import React from 'react';
import PropTypes from 'prop-types';

export const PaginationPageSize = ({queryHandler}) => {
    
    return (
        <div className={'row page-size'}>
            <div className={'col-lg-1'}>
                <p className={'text-muted'}>Page Size:</p>
                <select
                    name={'pageSize'}
                    className={'form-control'}
                    onChange={queryHandler}
                >
                    <option name='10'>10</option>
                    <option name='25'>25</option>
                    <option name='50'>50</option>
                </select>
            </div>
        </div>
    )
};


PaginationPageSize.propTypes = {
    queryHandler: PropTypes.func
};