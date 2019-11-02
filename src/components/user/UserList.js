import React from 'react';
import PropTypes from 'prop-types';
import {PaginatedList} from '../PaginatedList';


export const UserList = ({users, total, queryUsers, deleteUserHandler}) => {

	const headers = [
        {key: 'id', name: 'Id', css: 'narrow text-center'},
        {key: 'username', name: 'Username'},
        {key: 'firstName', name: 'First Name'},
        {key: 'lastName', name: 'Last Name'},
        {key: 'email', name: 'Email'},
        {key: 'actions', name: 'Actions', sortable: false, css: 'text-center'}
    ];
    
    const rowRenderer = ({id, userName, firstName, lastName, email, highlight}) => {
		
    	const klass = highlight ? 'table-success' : '';
    	
    	return (<tr key={id} className={klass}>
			<td className={'text-center'}>{id}</td>
			<td>{userName}</td>
			<td>{firstName}</td>
			<td>{lastName}</td>
			<td>{email}</td>
			<td>
				<div className={'text-center'}>
					<button className={'btn-link'} onClick={() => deleteUserHandler(id)}>
						<i className={'nc-icon nc-simple-remove'}/>
					</button>
				</div>
			</td>
		</tr>)
	};
    
    return (
        <PaginatedList
			items={users}
			total={total}
            headers={headers}
            getItemsHandler={queryUsers}
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
    ),
	queryUsers: PropTypes.func,
	deleteUserHandler: PropTypes.func,
	total: PropTypes.number
};
