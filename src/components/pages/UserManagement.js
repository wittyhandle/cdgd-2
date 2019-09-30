import React, { useState, useEffect } from 'react';
import {UserList} from './UserList';
import {Card} from '../Card';
import {NewUser} from './NewUser';

export const UserManagement = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const testUsers = [{
            userName: 'test',
            firstName: 'Mike',
            lastName: 'Ottinger',
            email: 'test@foo.com'
        }];

        setUsers(testUsers);
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