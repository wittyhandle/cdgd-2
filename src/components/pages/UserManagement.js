import React, {useEffect, useState} from 'react';
import {UserList} from '../user/UserList';
import {Card} from '../index';
import {NewUser} from '../user/NewUser';
import {userService} from '../../services';

export const UserManagement = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {

        userService.getUsers(10, 0).then(users => {
            setUsers(users)
        }).catch(err => {
            setError(err.message);
        });

    }, []);

    const handleNewUser = (user) => {

        let usersCopy = [...users];
        usersCopy.unshift(user);

        setUsers(usersCopy);
    };

    if (error) {
        throw new Error(error);
    }

    return (

        <div className={'row'}>
            <div className={'col-lg-12'}>

                <Card title={'User Management'}>
                    {() => (
                        <div>
                            <NewUser newUserHandler={handleNewUser}/>
                            <UserList users={users}/>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
};