import React, {useEffect, useReducer} from 'react';
import {UserList} from '../user/UserList';
import {Card} from '../index';
import {NewUser} from '../user/NewUser';
import {userService} from '../../services';

export const UserManagement = () => {
	
	const initialState = {
		users: [],
		total: 0
	};
	
	const reducer = (state, action) => {
	
		switch (action.type) {
			
			case 'load_users': {
				return {
					...state,
					users: action.users,
					total: action.total
				}
			}
			
			default: {
				return state;
			}
		}
	};
	
	const [state, dispatch] = useReducer(reducer, initialState);
	
	useEffect(() => {
		queryUsers(10, 0, 'id', 'asc');
	}, []);
	
	const queryUsers = (...args) => (
		userService.getUsers(...args).then(r => {
			dispatch({type: 'load_users', users: r.items, total: r.count});
		})
	);
	
    return (

        <div className={'row'}>
            <div className={'col-lg-12'}>
                <Card title={'User Management'}>
                    {() => (
                        <>
                            <NewUser/>
							<UserList users={state.users} total={state.total} queryUsers={queryUsers}/>
                        </>
                    )}
                </Card>
            </div>
        </div>
    )
};
