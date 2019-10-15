import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const PaginatedList = props => {
    
    const [items, setItems] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    
    useEffect(() => {
        
        props.getItems(limit, offset).then(items => {
            setItems(items);
        });
        
    }, [limit]);
    
    const handleClick = e => {
        console.log('handle');
        e.preventDefault();
        setLimit(30);
    };
    
    return (
        <div className={'cdgd-pagination'}>
            <div className={'table-responsive'}>
                <table className={'table'}>
                    <thead className={'text-primary'}>
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
            <hr />
            <div className={'row justify-content-between'}>
                
                <div className={'col-lg-8 pagination-label'}>
                    <p className={'text-muted'}>Showing 1 - 10 of 59</p>
                </div>
                <div className={'col-lg-4'}>
                    <ul className={'pagination pull-right'}>
                        <li className="paginate_button page-item previous disabled text-muted"><a href="#"
                                                                                       className="page-link">Previous</a>
                        </li>
                        <li className="paginate_button page-item active"><a
                            href="#"
                            data-dt-idx="1" tabIndex="0"
                            className="page-link">1</a></li>
                        <li className="paginate_button page-item "><a href="#"
                                                                      className="text-primary page-link">2</a>
                        </li>
                        <li className="paginate_button page-item next"><a href="#"
                                                                          className="text-primary page-link">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
        
    )
};

PaginatedList.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    getItems: PropTypes.func,
    rowRenderer: PropTypes.func
};