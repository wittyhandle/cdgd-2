import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {PaginationControls} from './index';
import {PaginationPageSize} from './index';

export const PaginatedList = props => {
    
    const [items, setItems] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        
        props.getItems(limit, offset).then(result => {
            setItems(result.items);
            setTotal(result.count);
        });
        
    }, [limit, offset, props]);
    
    const handlePageChange = (selectedPage) => {
        setOffset(selectedPage * limit);
    };
    
    const handlePageSizeChange = e => {
        setOffset(0);
        setLimit(Number(e.target.value));
    };
    
    return (
        <div className={'cdgd-pagination'}>
            <PaginationPageSize queryHandler={handlePageSizeChange}/>
            <div className={'table-responsive'}>
                <table className={'table'}>
                    <thead className={'text-info'}>
                    <tr>
                        {props.headers.map((h, i) => (
                            <th key={i}>{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((user) => (
                        props.rowRenderer(user)
                    ))}
                    </tbody>
                </table>
            </div>
            <PaginationControls total={total} pageSize={limit} queryHandler={handlePageChange}/>
        </div>
        
    )
};

PaginatedList.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    getItems: PropTypes.func,
    rowRenderer: PropTypes.func
};