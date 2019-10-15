import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const PaginationControls = props => {
    
    const [linkCount, setLinkCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    
    useEffect(() => {
        
        const count = Math.ceil(props.total / props.pageSize);
        setLinkCount(count);
        
    }, [props, currentIndex]);
    
    const handlePageClick = (e) => {
        e.preventDefault();
        setCurrentIndex(Number(e.target.text));
    };
    
    return (
        <div>
            <hr />
            <div className={'row justify-content-between'}>
                <div className={'col-lg-8 pagination-label'}>
                    <p className={'text-muted'}>Showing 1 - 10 of {props.total}</p>
                </div>
                <div className={'col-lg-4'}>
                    <ul className={'pagination pull-right'}>
                        
                        <li className={'page-item' + (currentIndex === 1 ? ' text-muted disabled' : '')}>
                            <a href={'#'} className={'page-link' + (currentIndex !== 1 ? ' text-primary' : '')}>Previous</a>
                        </li>
                        
                        {[...Array(linkCount)].map((n, i) => (
                            <li key={i} className={'page-item' + ((i + 1) === currentIndex ? ' active' : '')}>
                                <a href={'#'}
                                   className={'page-link' + ((i + 1) !== currentIndex ? ' text-primary' : '')}
                                   onClick={handlePageClick}>{i + 1}</a>
                            </li>
                        ))}
                        
                        <li className={'page-item' + (currentIndex === linkCount ? ' text-muted disabled' : '')}>
                            <a href={'#'} className={'page-link' + (currentIndex !== linkCount ? ' text-primary' : '')}>Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    
    )
};

PaginationControls.propTypes = {
    total: PropTypes.number,
    pageSize: PropTypes.number
};