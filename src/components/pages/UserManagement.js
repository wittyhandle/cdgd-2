import React, {useEffect, useReducer} from 'react';
import {UserList} from '../user/UserList';
import {Card} from '../index';
import {NewUser} from '../user/NewUser';
import {userService} from '../../services';
import {Modal} from '../Modal';

export const UserManagement = () => {
	
	const initialState = {
		users: [],
		total: 0,
		toDelete: {}
	};
	
	const reducer = (state, action) => {
	
		switch (action.type) {
			
			case 'load_users':
			case 'new_user': {
				return {
					...state,
					users: action.users,
					total: action.total
				}
			}
			case 'delete_prompt': {
				return {
					...state,
					toDelete: action.toDelete
				}
			}
			
			case 'delete_user': {
				return {
					...state,
					users: action.users,
					toDelete: {}
				}
			}
			
			case 'cancel_delete_user': {
				return {
					...state,
					toDelete: {}
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
	
	const newUserHandler = user => {
		user.highlight = true;
		dispatch({type: 'new_user', users: [user, ...state.users], total: state.total + 1});
	};
	
	const deleteUserHandler = id => {
		const toDelete = state.users.find((u) => u.id === id);
		dispatch({type: 'delete_prompt', toDelete});
	};
	
	const doUserDelete = () => {
		const users = state.users.filter((u) => u.id !== state.toDelete.id);
		dispatch({type: 'delete_user', users});
	};
	
	const cancelUserDelete = () => {
		dispatch({type: 'cancel_delete_user'});
	};
	
    return (

        <div className={'row'}>
            <div className={'col-lg-12'}>
                <Card title={'User Management'}>
                    {() => (
                        <>
                            <NewUser newUserHandler={newUserHandler}/>
							<UserList users={state.users} total={state.total} queryUsers={queryUsers} deleteUserHandler={deleteUserHandler}/>
                        </>
                    )}
                </Card>
            </div>
			<Modal
				show={!!state.toDelete.id}
				title={'Delete User?'}
				body={`Are you sure you want to delete <strong>${state.toDelete.firstName}</strong> with id <strong>${state.toDelete.id}</strong>?`}
				handleAction={doUserDelete}
				handleClose={cancelUserDelete}/>
        </div>
    )
};
