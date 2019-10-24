import React from 'react';
import PropTypes from 'prop-types';
import {PaginatedList} from '../PaginatedList';
import {userService} from '../../services';


export const UserList = () => {

    const headers = [
        {key: 'id', name: 'Id', 'size': 'narrow'},
        {key: 'username', name: 'Username'},
        {key: 'firstName', name: 'First Name'},
        {key: 'lastName', name: 'Last Name'},
        {key: 'email', name: 'Email'}
    ];
    
    const getUsers = (...args) => (
        userService.getUsers(...args)
    );
    
    const rowRenderer = ({id, userName, firstName, lastName, email}) => (
        <tr key={id}>
            <td>{id}</td>
            <td>{userName}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
        </tr>
    );
    
    return (
        <PaginatedList
            headers={headers}
            getItems={getUsers}
            rowRenderer={rowRenderer}/>
    )
};

UserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.number,
                userName: PropTypes.string,
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                email: PropTypes.string
            }
        )
    )
};