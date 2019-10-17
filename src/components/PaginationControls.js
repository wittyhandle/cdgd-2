import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const PaginationControls = ({total, pageSize, queryHandler}) => {
    
    const [linkCount, setLinkCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [minRecord, setMinRecord] = useState(0);
    const [maxRecord, setMaxRecord] = useState(0);
    
    useEffect(() => {
        const count = Math.ceil(total / pageSize);
        setLinkCount(count);
        
    }, [total, pageSize]);
    
    useEffect(() => {
        queryHandler(currentIndex);
    }, [currentIndex, queryHandler]);
    
    useEffect(() => {
        
        if (currentIndex === 0) {
            setMinRecord(1);
        } else {
            setMinRecord(((currentIndex) * pageSize) + 1);
        }
        
        const max = (currentIndex + 1) * pageSize;
        setMaxRecord(Math.min(max, total));
        
    }, [currentIndex, pageSize, total]);
    
    const handlePageClick = (e) => {
        e.preventDefault();
        // subtract one because currentIndex is zero-based
        setCurrentIndex(Number(e.target.text) - 1);
    };
    
    const handlePrevious = (e) => {
        e.preventDefault();
        setCurrentIndex(currentIndex - 1);
    };
    
    const handleNext = (e) => {
        e.preventDefault();
        setCurrentIndex(currentIndex + 1);
    };
    
    const showingLabel = total ? `Showing ${minRecord} - ${maxRecord} of ${total}` : '';
    
    return (
        <div>
            <hr />
            <div className={'row justify-content-between'}>
                <div className={'col-lg-8 pagination-label'}>
                    <p className={'text-muted'}>{showingLabel}</p>
                </div>
                <div className={'col-lg-4'}>
                    <ul className={'pagination pull-right'}>
                        
                        <li className={'page-item' + (currentIndex === 0 ? ' text-muted disabled' : '')}>
                            <a href={'#'}
                               className={'page-link' + (currentIndex !== 0 ? ' text-info' : '')}
                               onClick={handlePrevious}>Previous</a>
                        </li>
                        
                        {[...Array(linkCount)].map((n, i) => (
                            <li key={i} className={'page-item' + (i === currentIndex ? ' active' : '')}>
                                <a href={'#'}
                                   className={'page-link' + (i !== currentIndex ? ' text-info' : '')}
                                   onClick={handlePageClick}>{i + 1}</a>
                            </li>
                        ))}
                        
                        <li className={'page-item' + (currentIndex === (linkCount - 1) ? ' text-muted disabled' : '')}>
                            <a href={'#'}
                               className={'page-link' + (currentIndex !== (linkCount - 1) ? ' text-info' : '')}
                               onClick={handleNext}>Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

PaginationControls.propTypes = {
    total: PropTypes.number,
    pageSize: PropTypes.number,
    queryHandler: PropTypes.func
};