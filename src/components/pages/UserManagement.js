import React, { useState, useEffect } from 'react';
import {UserList} from './UserList';
import {Card} from '../Card';
import {NewUser} from './NewUser';
import { userService } from '../../services';

export const UserManagement = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        userService.getUsers().then(users => {
            setUsers(users)
        });

    }, []);

    const handleNewUser = (user) => {

        let usersCopy = [...users];
        usersCopy.unshift(user);

        setUsers(usersCopy);
    };

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