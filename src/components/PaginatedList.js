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
        toRecord: 0,
        sortBy: 'id',
        sortDirection: 'asc'
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
            case 'set_sort': {
                console.log('set sort with action', action);
                return {
                    ...state,
                    success: action.success,
                    items: action.response.items,
                    sortBy: action.sortBy,
                    sortDirection: action.sortDirection
                }
            }
            
            default: {
                return state;
            }
        }
    };
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        getItems(initialState.limit, initialState.startIndex, initialState.sortBy, initialState.sortDirection).then(response => {
            dispatch({type: 'get_users', response, success: true});
        });
    }, [getItems, initialState.limit, initialState.startIndex, initialState.sortBy, initialState.sortDirection]);
    
    const handlePageChange = selectedPage => {
        const startIndex = (selectedPage - 1) * state.limit;
        getItems(state.limit, startIndex, state.sortBy, state.sortDirection).then(response => {
            dispatch({type: 'change_page', response, selectedPage, startIndex, success: true});
        });
    };
    
    const handlePageSizeChange = e => {
        const limit = Number(e.target.value);
        getItems(limit, 0, state.sortBy, state.sortDirection).then(response => {
            dispatch({type: 'change_page_size', response, selectedPage: 1, startIndex: 0, limit, success: true});
        });
    };
    
    const handleSort = (column, direction) => {
        
        getItems(state.limit, state.startIndex, column, direction).then(response => {
            dispatch({type: 'set_sort', response, sortBy: column, sortDirection: direction, success: true});
        });
    };
    
    const isSortIconActive = (column, direction) => (
        state.sortBy === column && state.sortDirection === direction ? ' active' : ''
    );
    
    const fromRecord = state.currentPage === 1 ? 1 : ((state.currentPage - 1) * state.limit) + 1;
    const toRecord = Math.min(state.currentPage * state.limit, state.total);
    
    return (
        <div className={'cdgd-pagination bootstrap-table'}>
            <PaginationPageSize onPageSizeChange={handlePageSizeChange}/>
            <div className={'table-responsive fixed-table-container'}>
                <table className={'table'}>
                    <thead className={'text-info'}>
                    <tr>
                        {headers.map(h => (
                            <th key={h.key}>
                                {h.name}
                                <div className={'sorts'}>
                                    <div onClick={() => handleSort(h.key, 'asc')} className={'up' + isSortIconActive(h.key, 'asc')}>
                                        <FontAwesomeIcon icon={'sort-up'}  />
                                    </div>
                                    <div onClick={() => handleSort(h.key, 'desc')}  className={'down' + isSortIconActive(h.key, 'desc')}>
                                        <FontAwesomeIcon icon={'sort-down'} />
                                    </div>
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
    headers: PropTypes.arrayOf(PropTypes.shape({key: PropTypes.string, name: PropTypes.string})),
    getItems: PropTypes.func,
    rowRenderer: PropTypes.func
};