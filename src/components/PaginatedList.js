import React, {useEffect, useReducer} from 'react';
import PropTypes from 'prop-types';
import {PaginationControls} from './index';
import {PaginationPageSize} from './index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const PaginatedList = ({getItems, headers, rowRenderer}) => {
    
    const initialState = {
        items: [],
        isLoaded: false,
        success: false,
        limit: 10,
        startIndex: 0,
        currentPage: 1,
        total: 0,
        fromRecord: 0,
        toRecord: 0
    };
    
    const reducer = (state, action) => {
    
        switch(action.type) {
            case 'get_users': {
                return {
                    ...state,
                    success: action.success,
                    isLoaded: true,
                    items: action.response.items,
                    total: action.response.count
                }
            }
            case 'change_page': {
                return {
                    ...state,
                    success: action.success,
                    items: action.response.items,
                    currentPage: action.selectedPage,
                    startIndex: action.startIndex,
                    fromRecord: action.fromRecord,
                    toRecord: action.toRecord
                }
            }
            case 'change_page_size': {
                return {
                    ...state,
                    success: action.success,
                    items: action.response.items,
                    currentPage: action.selectedPage,
                    startIndex: action.startIndex,
                    limit: action.limit,
                    fromRecord: action.fromRecord,
                    toRecord: action.toRecord
                }
            }
            default: {
                return state;
            }
        }
    };
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        getItems(initialState.limit, initialState.startIndex).then(response => {
            dispatch({type: 'get_users', response, success: true});
        });
    }, [getItems, initialState.limit, initialState.startIndex]);
    
    const handlePageChange = selectedPage => {
        const startIndex = (selectedPage - 1) * state.limit;
        getItems(state.limit, startIndex).then(response => {
            dispatch({type: 'change_page', response, selectedPage, startIndex, success: true});
        });
    };
    
    const handlePageSizeChange = e => {
        const limit = Number(e.target.value);
        getItems(limit, 0).then(response => {
            dispatch({type: 'change_page_size', response, selectedPage: 1, startIndex: 0, limit, success: true});
        });
    };
    
    const handleSort = e => {
        console.log('sortee!');
    };
    
    const fromRecord = state.currentPage === 1 ? 1 : ((state.currentPage - 1) * state.limit) + 1;
    const toRecord = Math.min(state.currentPage * state.limit, state.total);
    
    return (
        <div className={'cdgd-pagination bootstrap-table'}>
            <PaginationPageSize onPageSizeChange={handlePageSizeChange}/>
            <div className={'table-responsive fixed-table-container'}>
                <table className={'table'}>
                    <thead className={'text-info'}>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i}>
                                {h}
                                <div className={'sorts'}>
                                    <div className={'up active'} onClick={handleSort}><FontAwesomeIcon icon={'sort-up'}  /></div>
                                    <div className={'down'} onClick={handleSort}><FontAwesomeIcon icon={'sort-down'} /></div>
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {state.items.map((user) => (
                        rowRenderer(user)
                    ))}
                    </tbody>
                </table>
            </div>
            <PaginationControls
                total={state.total}
                pageSize={state.limit}
                currentPage={state.currentPage}
                fromRecord={fromRecord}
                toRecord={toRecord}
                onPageChange={handlePageChange}
            />
        </div>
        
    )
};

PaginatedList.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    getItems: PropTypes.func,
    rowRenderer: PropTypes.func
};