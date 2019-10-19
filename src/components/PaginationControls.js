import React from 'react';
import PropTypes from 'prop-types';

export const PaginationControls = ({total, pageSize, currentPage, onPageChange, fromRecord, toRecord}) => {
    
    const handlePageChange = e => {
        e.preventDefault();
        onPageChange(Number(e.target.text));
    };
    
    const handlePreviousClick = e => {
        e.preventDefault();
        onPageChange(currentPage - 1);
    };
    
    const handleNextClick = e => {
        e.preventDefault();
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
                            <a href={'#'}
                               className={'page-link' + (currentPage !== 1 ? ' text-info' : '')}
                               onClick={handlePreviousClick}>Previous</a>
                        </li>
                        
                        {[...Array(linkCount)].map((n, i) => (
                            <li key={i} className={'page-item' + (i === (currentPage - 1) ? ' active' : '')}>
                                <a href={'#'}
                                   className={'page-link' + (i !== (currentPage - 1) ? ' text-info' : '')}
                                   onClick={handlePageChange}>{i + 1}</a>
                            </li>
                        ))}
                        
                        <li className={'page-item' + (currentPage === linkCount ? ' text-muted disabled' : '')}>
                            <a href={'#'}
                               className={'page-link' + (currentPage !== linkCount ? ' text-info' : '')}
                               onClick={handleNextClick}>Next</a>
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