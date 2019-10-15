import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {PaginationControls} from './PaginationControls';

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
    
    const handleItemsQuery = (selectedPage) => {
        setOffset(selectedPage * limit);
    };
    
    return (
        <div className={'cdgd-pagination'}>
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
            <PaginationControls total={total} pageSize={limit} queryHandler={handleItemsQuery}/>
        </div>
        
    )
};

PaginatedList.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    getItems: PropTypes.func,
    rowRenderer: PropTypes.func
};