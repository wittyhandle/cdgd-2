import React from 'react';
import PropTypes from 'prop-types';

export const PaginationControls = ({total, pageSize, currentPage, onPageChange, fromRecord, toRecord}) => {
    
    const handlePageChange = page => {
        onPageChange(page);
    };
    
    const handlePreviousClick = () => {
        onPageChange(currentPage - 1);
    };
    
    const handleNextClick = () => {
        onPageChange(currentPage + 1);
    };
    
    const showingLabel = total ? `Showing ${fromRecord} - ${toRecord} of ${total}` : '';
    const linkCount = Math.ceil(total / pageSize);
    
    return (
        <div>
            <hr />
            <div className={'row justify-content-between'}>
                <div className={'col-lg-8 pagination-label'}>
                    <p className={'text-muted'}>{showingLabel}</p>
                </div>
                <div className={'col-lg-4'}>
                    <ul className={'pagination pull-right'}>
                        
                        <li className={'page-item' + (currentPage === 1 ? ' text-muted disabled' : '')}>
                            <button
                                className={'page-link btn-link' + (currentPage !== 1 ? ' text-info' : '')}
                                onClick={handlePreviousClick}><i className={'nc-icon nc-minimal-left'}/></button>
                        </li>
                        
                        {[...Array(linkCount)].map((n, i) => (
                            <li key={i} className={'page-item' + (i === (currentPage - 1) ? ' active' : '')}>
                                <button
                                    className={'page-link btn-link' + (i !== (currentPage - 1) ? ' text-info' : '')}
                                    onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        
                        <li className={'page-item' + (currentPage === linkCount ? ' text-muted disabled' : '')}>
                            <button
                                className={'page-link btn-link' + (currentPage !== linkCount ? ' text-info' : '')}
                                onClick={handleNextClick}><i className={'nc-icon nc-minimal-right'}/></button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

PaginationControls.propTypes = {
    onPageChange: PropTypes.func,
    total: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    fromRecord: PropTypes.number,
    toRecord: PropTypes.number
};
